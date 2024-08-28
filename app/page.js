import Link from "next/link";

export default async function Home() {
  let mainLink = "http://localhost:3000/profile/";

  return (
    <div>
    <h4 className="title"><Link href="/">홈페이지</Link></h4>
    <h4 className="title"><Link href="./components/main">메인 홈페이지</Link></h4>
    <h4 className="title"><Link href="./components/test">테스트 모델</Link></h4>
  </div>
  )
}