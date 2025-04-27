import http from 'http'; 
const PORT = process.env.PORT || 5000; 

const server = http.createServer((req,res) => {
    if(req.url === "/" && req.method === 'GET'){
       res.write(200, {"Content-Type" : "application/json"}); 
       res.end(JSON.stringify({message : "Good"}))
    }
}); 

server.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`); 
})