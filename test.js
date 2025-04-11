const bcrypt = require('bcrypt');

// bcrypt.hash("1234",10,(err,hashed)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(hashed);
//     }
// })

const hashedPassword = ["$2b$10$xz32gzGEb1NqUaSoiCkHruvFGxJ1k61Uk9N0GksgERccIW4N1eTNa","$2b$10$I6QPMVU2qzj734DmZxahU.apYTr5fdbSP1/Yt5KsI5qbiwiZv23SG"];
hashedPassword.forEach( v=>{
    bcrypt.compare("1234", v, (err, result) => {
        if (result) {
            console.log("비밀번호 일치! 🔐");
        } else {
            console.log("비밀번호 불일치 ❌");
        }
    });
})
