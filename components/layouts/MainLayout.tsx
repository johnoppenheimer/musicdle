import TopNav from '../navigation/TopNav';

type MainLayoutProps = {
    children?: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => (
    <div className="h-screen">
        <TopNav />
        <div className="max-w-screen-md mx-auto pt-14">{children}</div>
    </div>
);

export default MainLayout;
