import Footer from "@/Components/Home/Footer";
import Header from "@/Components/Home/Header";
import Main from "@/Components/Tour/Main";


export default function Tour({children}) {
    return (
        <div>
            <Header></Header>
            <main className="main">
                {children}
            </main>
            <Footer></Footer>
        </div>
    );
}