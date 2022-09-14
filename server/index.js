// file-loader 적용 시 file을 import 해서 사용할 수 있다.
// import woowa from "./woowabros.png";

// const $img = document.createElement("img");
// $img.src = woowa;
// $img.alt = "this is woowabros png";
// document.body.appendChild($img);
//
import "./style/main.scss";
function div() {
  const e = document.createElement("div");
  e.innerHTML = "hello world";
  return e;
}
document.body.appendChild(div());
