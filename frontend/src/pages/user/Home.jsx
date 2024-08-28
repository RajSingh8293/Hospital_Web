import CategoryCarousal from "@/components/comp/CategoryCarousal"
import Hero from "@/components/comp/Hero"
import { IoCodeSlashOutline } from "react-icons/io5"
import Layout from "@/components/comp/Layout"

const Home = () => {
    const categoryCard = [
        {
            logo: <IoCodeSlashOutline />,
            categoryName: "Web Devlopment",
            jobs: "90 Jobs"
        },
        {
            logo: <IoCodeSlashOutline />,
            categoryName: "App Devlopment",
            jobs: "15 Jobs"
        },
        {
            logo: <IoCodeSlashOutline />,
            categoryName: "IOS Devlopment",
            jobs: "170 Jobs"
        },
        {
            logo: <IoCodeSlashOutline />,
            categoryName: "Android Devlopment",
            jobs: "10 Jobs"
        },
        {
            logo: <IoCodeSlashOutline />,
            categoryName: "Medical",
            jobs: "20 Jobs"
        },
        {
            logo: <IoCodeSlashOutline />,
            categoryName: "Restaurant",
            jobs: "17 Jobs"
        },
        {
            logo: <IoCodeSlashOutline />,
            categoryName: "Hotel",
            jobs: "7 Jobs"
        },
    ]
    return (
        <Layout>
            <section>
                <Hero />
                <CategoryCarousal category={categoryCard} title="Jobs Categories" />
            </section>
        </Layout>
    )
}

export default Home