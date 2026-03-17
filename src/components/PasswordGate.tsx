import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";

const SITE_PASSWORD = "yabloko2026";
const STORAGE_KEY = "site_authenticated";

export const isAuthenticated = () => {
  return sessionStorage.getItem(STORAGE_KEY) === "true";
};

const PasswordGate = ({ children }: { children: React.ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === SITE_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (authenticated) return <>{children}</>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-6 text-center"
      >
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Lock className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-foreground">
          Доступ ограничен
        </h1>
        <p className="text-muted-foreground text-sm">
          Введите пароль для доступа к сайту
        </p>
        <Input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          className={error ? "border-destructive" : ""}
          autoFocus
        />
        {error && (
          <p className="text-destructive text-sm">Неверный пароль</p>
        )}
        <Button type="submit" className="w-full">
          Войти
        </Button>
      </form>
    </div>
  );
};

export default PasswordGate;
