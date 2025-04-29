import http from "http";
import fs from "fs/promises";
import path from "path";

const PORT = process.env.PORT;

const folderPath = path.join(
  "C:",
  "Users",
  "Tenzin Nyima",
  "OneDrive",
  "Desktop",
  "dummy"
);

const subFolder = path.join(folderPath, 'jpeg'); 
console.log("subfolder", subFolder); 

const createNewDir = async (fileExtensions) => {
    const folderNames = fileExtensions.map(ext => ext.replace('.', '')); 
    console.log(folderNames); 
        for(const folderName of folderNames){
           try{
              
           }catch(error){

           }
        }
   
}

const getTypesofFiles = async (files) => {
  let typesOfFile = new Set();
  files.forEach((fileName) => {
    const ext = path.extname(fileName).toLowerCase();
    if (ext) typesOfFile.add(ext);
  });
//   createNewDir(Array.from(typesOfFile)); 
};

const readDummyFolder = async () => {
  try {
    const files = await fs.readdir(folderPath);
    getTypesofFiles(files);
  } catch (error) {
    console.log("Error reading dummy folder:", error.message);
  }
};
readDummyFolder();
const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Good" }));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
});
