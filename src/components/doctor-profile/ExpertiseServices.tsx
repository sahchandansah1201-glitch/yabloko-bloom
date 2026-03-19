import { DoctorProfileServices } from "@/components/doctor-profile/DoctorProfileServices";

const services = [
  {
    icon: "sparkles",
    title: "Косметология",
    items: ["Ботулинотерапия", "Контурная пластика", "Anti-Age"],
  },
  {
    icon: "stethoscope",
    title: "Дерматология",
    items: ["Лечение угревой болезни (Акне)", "Дерматоскопия", "Удаление новообразований"],
  },
  {
    icon: "scissors",
    title: "Трихология",
    items: ["Диагностика выпадения волос", "Мезотерапия"],
  },
];

export function ExpertiseServices() {
  return <DoctorProfileServices services={services} />;
}

