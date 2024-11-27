import Image from "next/image";
import styles from "./page.module.css";
import Nav from "@/Components/Nav/Nav";
import Hero from "@/Components/Hero/Hero";
import Planes from "@/Components/Planes/Planes";
import Info from "../app/Info/Info";

export default function Home() {
  return (
    <div className={styles.page}>
    <Nav/>
    <Hero/>
    <Info/>
    <Planes/>
    </div>
  );
}
