(async (page, url) => {
  await page.setViewportSize({width:390,height:844});
  const response = await page.goto(url, {waitUntil:"domcontentloaded", timeout:25000});
  let reviewsReady=true;
  try { await page.waitForFunction(()=>!document.querySelector("reviews-widget")||!!document.querySelector("reviews-widget").shadowRoot?.querySelector(".rw-panel"), undefined, {timeout:12000}); } catch (_) {reviewsReady=false;}
  const measure = await page.evaluate(async () => {
    await Promise.race([document.fonts.ready,new Promise(resolve=>setTimeout(resolve,4000))]);
    const fontsReady=document.fonts.status==="loaded";
    const pause = () => new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
    let steps=0;
    for(let y=0; y<document.documentElement.scrollHeight && steps<180; y+=650) {
      scrollTo({top:y,behavior:"instant"}); await pause(); steps++;
    }
    scrollTo({top:0,behavior:"instant"}); await pause();
    const main=document.querySelector("main") || document.querySelector("#content") || document.body;
    const footer=document.querySelector("footer");
    const styles=new WeakMap(), rects=new WeakMap();
    const style=e=>{if(!styles.has(e))styles.set(e,getComputedStyle(e));return styles.get(e);};
    const rect=e=>{if(!rects.has(e))rects.set(e,e.getBoundingClientRect());return rects.get(e);};
    const parent=e=>e.parentElement||(e.getRootNode().host||null);
    const description=e=>e.tagName.toLowerCase()+(e.id?"#"+e.id:"")+[...e.classList].slice(0,3).map(c=>"."+c).join("");
    const visible=e=>{
      for(let n=e;n&&n!==document.documentElement;n=parent(n)){
        const s=style(n);
        if(s.display==="none"||s.visibility==="hidden"||s.visibility==="collapse"||Number(s.opacity)===0||s.position==="fixed"||n.matches(".elementor-location-header"))return false;
      }
      return true;
    };
    const clip=(box,e)=>{
      let x1=box.left,x2=box.right,y1=box.top,y2=box.bottom;
      for(let n=parent(e);n&&n!==document.body;n=parent(n)){
        const s=style(n),r=rect(n);
        if(["hidden","clip","auto","scroll"].includes(s.overflowX)){x1=Math.max(x1,r.left);x2=Math.min(x2,r.right);}
        if(["hidden","clip","auto","scroll"].includes(s.overflowY)){y1=Math.max(y1,r.top);y2=Math.min(y2,r.bottom);}
      }
      return {x1,x2,y1:y1+scrollY,y2:y2+scrollY};
    };
    const content=[], wrappers=[], brokenImages=[];
    let elementCount=0;
    const add=(box,e,kind)=>{
      const c=clip(box,e);
      if(c.x2<=Math.max(0,c.x1)||c.x1>=innerWidth||c.y2-c.y1<2||c.x2-c.x1<2)return;
      content.push({top:c.y1,bottom:c.y2,node:description(e),kind});
    };
    const walk=e=>{
      if(++elementCount>60000||!visible(e))return;
      const s=style(e),r=rect(e);
      if((e.matches("img,video,iframe,object,embed,canvas,svg,input,select,textarea")||s.backgroundImage.includes("url("))&&r.height>0) {
        add(r,e,e.tagName.toLowerCase());
        if(e.tagName==="IMG"&&e.complete&&e.naturalWidth===0)brokenImages.push({node:description(e),src:e.getAttribute("src")});
      }
      for(const n of e.childNodes){
        if(n.nodeType===Node.TEXT_NODE&&n.textContent.trim()&&!e.matches("script,style,noscript,template")){
          const range=document.createRange();range.selectNodeContents(n);
          for(const box of range.getClientRects())add(box,e,"text");
        }else if(n.nodeType===Node.ELEMENT_NODE)walk(n);
      }
      if(e.shadowRoot)for(const child of e.shadowRoot.children)walk(child);
      if(e.matches(".elementor-widget,.e-con,.e-con-inner")&&r.height>250){
        const children=[...e.children].filter(c=>!c.matches("style,script,template")&&visible(c)&&style(c).position!=="absolute"&&rect(c).height>0);
        if(children.length){const bottom=Math.max(...children.map(c=>rect(c).bottom));const extra=r.bottom-bottom-parseFloat(s.paddingBottom||0);if(extra>240)wrappers.push({node:description(e),top:r.top+scrollY,height:r.height,extra});}
      }
    };
    walk(main);
    content.sort((a,b)=>a.top-b.top||b.bottom-a.bottom);
    const gaps=[];let previous=null,end=rect(main).top+scrollY;
    for(const item of content){
      if(item.top-end>240)gaps.push({top:end,bottom:item.top,size:item.top-end,before:previous?.node||"main-start",after:item.node});
      if(item.bottom>end){end=item.bottom;previous=item;}
    }
    const footerTop=footer?rect(footer).top+scrollY:null;
    const footerGap=footerTop===null?null:footerTop-end;
    if(footerGap>240)gaps.push({top:end,bottom:footerTop,size:footerGap,before:previous?.node||"main-empty",after:"footer"});
    const heading=document.querySelector("h1");
    const templates=[...new Map([...document.querySelectorAll("[data-elementor-type][data-elementor-id]")].map(e=>[e.getAttribute("data-elementor-type")+":"+e.getAttribute("data-elementor-id"),{type:e.getAttribute("data-elementor-type"),id:e.getAttribute("data-elementor-id")}])).values()];
    return {width:innerWidth,height:document.documentElement.scrollHeight,fontsReady,mainHeight:rect(main).height,footerTop,footerGap,gaps,wrappers:wrappers.sort((a,b)=>b.extra-a.extra).slice(0,8),horizontalOverflow:document.documentElement.scrollWidth>innerWidth,elementCount,scrollSteps:steps,scrollComplete:steps<180,brokenImages:brokenImages.slice(0,6),heading:heading?.textContent.trim(),templates,bodyClass:document.body.className};
  });
  return {requested:url,url:page.url(),status:response?.status(),reviewsReady,...measure};
})
