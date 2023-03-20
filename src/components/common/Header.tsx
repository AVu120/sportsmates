import Link from "next/link";
import Image from "next/image";

/** Common Header that displays on the top of every page. */
export const Header = () => (
  <header
    style={{
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      padding: "10px",
    }}
  >
    <Link href="/">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          columnGap: "10px",
        }}
      >
        <Image src="/logo.png" width={25} height={25} alt="" />{" "}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontWeight: "bold",
          }}
        >
          <p>Cricket </p>
          <p>Buddy</p>
        </div>
      </div>
    </Link>
    <div style={{ display: "flex", columnGap: "10px" }}>
      <Link href="/login">
        <button>Log in</button>
      </Link>
      <Link href="/signup">
        <button>Sign up</button>
      </Link>
    </div>
  </header>
);
