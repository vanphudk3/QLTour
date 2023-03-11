import Footer from "@/Components/Home/Footer";
import Header from "@/Components/Home/Header";



export default function Home({ children }) {
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