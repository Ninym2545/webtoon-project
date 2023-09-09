export function html({ url, text }) {
  return `
    <div style="width: 50%;margin-left: auto; margin-right: auto; padding: 20px;">
         <div style="text-align: center; font-weight: 700; color: red;font-size: 18px; padding: 5px">
             <span>NFT </span>Webtoon
         </div>
         <div style="padding: 10px">
         <p>สวัสดี,</p>
         <p>คุณขอใช้ที่อยู่อีเมลนี้เพื่อเข้าถึงบัญชี WEBTOON NFT ของคุณ</p>
         <p>คลิกลิงก์ด้านล่างเพื่อยืนยันที่อยู่อีเมลนี้</p>
         </div>
        
         <div style="margin: 10px">
         <a href=${url}>
         <button style="color: white;background-color: green;border: none;padding: 10px 20px;font-size: 16px;">
         ${text}
         </button>
         </div>
        </a>
    </div>
    `;
}
