import Footer from "@/Components/Home/Footer";
import Header from "@/Components/Home/Header";


export default function Tour({ children }) {
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