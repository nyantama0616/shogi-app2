import { MainHeader } from "./main-header";
import { MainFooter } from "./main-footer";

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader />
      <main className="flex-grow p-8">
        {children}
      </main>
      <MainFooter />
    </div>
  );
};
