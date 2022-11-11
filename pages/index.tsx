import Head from "next/head";
import Image from "next/image";
import React from "react";
import About from "../components/About";
import Landing from "../components/Landing";
import NavBar from "../components/NavBar";
import Skills from "../components/Skills";
import createScrollSnap from "scroll-snap";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className="main-container min-h-screen min-w-screen">
      <div>
        <div className="snap-start h-screen z-10">
          <Landing />
        </div>
        <NavBar />
        <div className="flex flex-col snap-start h-screen z-0">
          <About />
          <Skills />
        </div>
        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Created with ❤️ by Zaid
          </a>
        </footer>
      </div>
    </div>
  );
}
