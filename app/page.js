import Link from "next/link";
import './styles/module.css';

export default function Home() {

  return (
    <div>
    <h4 className="title"><Link href="/components/main">메인 홈페이지</Link></h4>
    <div className='title_sub'><input className='modal_input' type = "text"/> <button>접속</button></div>
  </div>
  )
}
