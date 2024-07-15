import { useState } from "react";

export const QrCode = () => {

    const [img, setImg] = useState('1.jpg');
    const [loading, setloading] = useState(false);
    const [qrData, setQrData] = useState('');
    const [qrSize, setQrSize] = useState(150);
    async function generateQr(){
        setloading(true)
        try{
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize*qrSize}&data=${encodeURIComponent(qrData)}` 
            setImg(url)
        }catch(error)
        {
            console.error("error", error);
        }finally{
            setloading(false);
        }
    }

    function downloadQr(name)
    {
        fetch(img).then((Response) => Response.blob())
        .then((blob) => {
            const link = document.createElement("a")
            link.href = URL.createObjectURL(blob);
            link.download = "qrcode.png";
            document.body.appendChild(link);
            link.click();
            document.body.replaceChild(link);
        }).catch((error) => {
            console.error("error download", error);
        });
    }
  return (
    <div className="app-container">
        <h1>Qr Code Generater</h1>
        {loading && <p>Please wait... </p>}
        <img src={img} className="qr-code-image"/>
        <div>
            <label htmlFor="dataInput" className="input-label" >
                Data for QR code:
            </label>
            <input type="text" id="dataInput" name="dataInput" value={qrData} placeholder="enter data for Qr code" onChange={(e) => setQrData(e.target.value)} />
            <label htmlFor="sizeInput" className="input-label" >
                Image Size:
            </label>
            <input type="text" id="sizeInput" name="sizeInput" value={qrSize} placeholder="Size for Qr code" onChange={(e) => setQrSize(e.target.value)} />
            <button className="generate-button" disabled={loading} onClick={generateQr}>Generate Qr Code</button>
            <button className="download-button" onClick={()=>downloadQr('hi')}>Download</button>
        </div>
    </div>
  );
};

export default QrCode;
