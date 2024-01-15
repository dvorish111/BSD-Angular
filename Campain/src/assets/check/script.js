   //שימו לב!! שיטת הפוסטמסג' לא עובדת בשרת מקומי (localhost). חובה להעלות את הקוד שלכם לדומיין שלכם.

//    window.onerror = function (msg, url, line, col, error) {
//     alert("שגיאת תוכנה. פנה לתמיכה טכנית. שגיאה: " + msg)
// }

// //זהירות! את השורת קוד הזו יש להפעיל רק פעם אחת בעת פתיחת הדף
// window.onload = function () {
    
// console.log(document.getElementById('FirstName').value);
//     if (window.addEventListener) { window.addEventListener("message", ReadPostMessage, false); } else { window.attachEvent("onmessage", ReadPostMessage); }
//     document.getElementById('NedarimFrame').onload = function () { console.log('StartNedarim'); PostNedarim({'Name':'GetHeight'}) }
//     document.getElementById('NedarimFrame').src = "https://matara.pro/nedarimplus/iframe?language=en";
// }
///////////////////////////////

function PostNedarim(Data) {      
var iframeWin = document.getElementById('NedarimFrame').contentWindow; iframeWin.postMessage(Data, "*"); };
function ReadPostMessage(event) {
    console.log(event.data);
    switch (event.data.Name) {
        case 'Height':
            //Here you get the height of iframe | event.data.Value
            document.getElementById('NedarimFrame').style.height = (parseInt(event.data.Value) + 15) + "px";
            document.getElementById('WaitNedarimFrame').style.display = 'none';
            break;

        case 'TransactionResponse':
            document.getElementById('Result').innerHTML = '<b>TransactionResponse:<br/>' + JSON.stringify("ClientName"+event.data.Value.ClientName,"\nAmount"+event.data.Value.Amount,"\nLastNum"+event.data.Value.LastNum+document.getElementById('Neighborhood') )+ '</b><br/>see full data in console';
            console.log(event.data.Value)
            if (event.data.Value.Status == 'Error') {
                document.getElementById('ErrorDiv').innerHTML = event.data.Value.Message
                document.getElementById('WaitPay').style.display = 'none';
                document.getElementById('PayBtDiv').style.display = 'block';
            } else {
                document.getElementById('WaitPay').style.display = 'none';
                document.getElementById('OkDiv').style.display = 'block';
            }
    }
}
function PayBtClick() {
    var ApiValid;
    var Mosad;
    document.getElementById('Result').innerHTML = ''
    document.getElementById('PayBtDiv').style.display = 'none';
    document.getElementById('OkDiv').style.display = 'none';
    document.getElementById('WaitPay').style.display = 'block';
    document.getElementById('ErrorDiv').innerHTML = '';
    switch(document.getElementById('Neighborhood').value)
   {
case "1":
    Mosad=31;
ApiValid="BQZYrRMXvF";
    break;
case "2":
    Mosad=7001267;
    ApiValid="hbOO24qBMT";  
    break;
 case "3":
    Mosad=32;
    ApiValid="ckUDDk+Efb"; 
    break;
case "4":
    Mosad=33;
    ApiValid="tFX9DPmB9P"; 
    break;
case "5":
    Mosad=5776829;
    ApiValid="737FzAnO1v";  
    break;
case "5":
    Mosad=7001979;
    ApiValid="ug8/1AHy4Q";  
    break;
default:
    Mosad=5776829;
    ApiValid="737FzAnO1v";  
          
  }
  console.log(Mosad+"mosad"+document.getElementById('Neighborhood').value)
    PostNedarim({
        'Name': 'FinishTransaction2',
        'Value': {
            'Mosad':Mosad,
            'ApiValid':ApiValid,
            'PaymentType': document.getElementById("PaymentType").value,
            'Currency': '1',
            'Zeout': document.getElementById('Zeout').value,
            'FirstName': document.getElementById('FirstName').value,
            'LastName': document.getElementById('LastName').value,
            'Street': document.getElementById('Street').value,
            'City': document.getElementById('City').value,
            'Phone': document.getElementById('Phone').value,
            'Mail': document.getElementById('Mail').value,
            'Amount': document.getElementById('Amount').value,
            'Tashlumim': document.getElementById('Tashlumim').value?document.getElementById('Tashlumim').value:1,
            'Groupe': '',
            'Comment': document.getElementById('Comment').value,

            'Param1': 'פרמטר 1',
            'Param2': '',
            'ForceUpdateMatching': '1', //מיועד לקמפיין אם מעוניינים שהמידע יידחף ליעד, למרות שזה לא נהוג באייפרם

            'CallBack': '', //מיועד לקבלת WEBHOOK לאחר כל עסקה / סירוב
            'CallBackMailError': '', //מיועד לקבלת התראה על תקלת בשליחת קאלבק למייל של המפתח במקום למייל של אנשי הקשר של המוסד

            'Tokef': document.getElementById('Tokef').value //אם אתם מנהלים את התוקף בדף שלכם (מיועד למי שרוצה להפריד בין חודש לשנה ורוצה לעצב מותאם אישית)

        }
    });
}

function sendMessageToParent(x) {
    const inputData = 'Data from iframe'; // The input data you want to send
    window.parent.postMessage(x, '../../app/payment/payment.component.ts'); // Replace with the actual parent URL
  }
