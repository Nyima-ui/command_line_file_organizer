import http from "http";
import fs from "fs/promises";
import path from "path";

const PORT = process.env.PORT;
// C:\Users\Tenzin Nyima\Downloads
const folderPath = path.join(
  "C:",
  "Users",
  "Tenzin Nyima",
  "Downloads"
);
/**
 * Create folders based on file extensions. 
 * @param {string[]} fileExtensions - An array of file extensions (e.g. '.ttf', '.pdf', ) 
 * @returns {Promise<string[]>} A promise that resolves with an array of created subfolder paths. 
 */
const createNewDir = async (fileExtensions) => {
  const folderNames = fileExtensions.map((ext) => ext.replace(".", ""));
  const subFolderPaths = []; 
  for (const folderName of folderNames) {
    const subFolderPath = path.join(folderPath, folderName);
    subFolderPaths.push(subFolderPath)
    try {
      await fs.mkdir(subFolderPath, { recursive: true });
      console.log(subFolderPath, "created successfully")
    } catch (error) {
       if(error.code === 'EEXIST'){
          console.log(`${subFolderPath} already exists`)
       }else{
        console.log(`Error creating ${subFolderPath} : ${error}`); 
       }
    }
  }
  return subFolderPaths; 
};
/**
 * Gets unique file extensions from a list of filenames. 
 * @param {string[]} files - An array of filenames. 
 * @returns {string[]} An array of unique lowercase file extensions (incuding the dot)
 */
const getTypesofFiles = (files) => {
  let typesOfFile = new Set();
  files.forEach((fileName) => {
    const ext = path.extname(fileName).toLowerCase();
    if (ext) typesOfFile.add(ext);
  });
  return Array.from(typesOfFile); 
};
/**
 * Reads the contents of the dummy folder. 
 * @returns {Promise<string[] | undefined>} A promise that resolves with an array of filenames or undefined if an error occurs. 
 */
const readDummyFolder = async () => {
  try {
    const files = await fs.readdir(folderPath);
    return files; 
  } catch (error) {
    console.log("Error reading dummy folder:", error.message);
    return undefined; 
  }
};

/**
 * Moves files from the dummy folder to their respective extension-based subfolders. 
 */
const moveFiletoRespectiveFolder = async () => {
    const files = await readDummyFolder(); 
    if(!files || files.length === 0){
       console.log("No files found in the dummy folder or error reading folder. Nothing to move."); 
       return; 
    } 

    const fileExtensions = getTypesofFiles(files); 
    const subFolderPaths = await createNewDir(fileExtensions); 
    
    const extensionFolderMap = {}; 
    subFolderPaths.forEach(folderPath => {
      const folderName = path.basename(folderPath); 
      extensionFolderMap[folderName] = folderPath; 
    });
    console.log(extensionFolderMap); 

    for(const file of files){
      const oldPath = path.join(folderPath, file); 
      const fileExtension = path.extname(file).toLowerCase().replace(".", ""); 

      const targetFolderPath = extensionFolderMap[fileExtension]; 

      if(!targetFolderPath){
        console.log(`Skipping ${file}: No corresponding folder found for extension ${fileExtension || "none" }.`)
        continue; 
      }

      const newPath = path.join(targetFolderPath, file); 

      try{
        await fs.rename(oldPath, newPath); 
        console.log(`Moved ${file} to ${targetFolderPath}`); 
      }catch(error){
        console.error(`Error moving file ${file} to ${targetFolderPath}:`, error); 
      }
    }

    console.log("File organization complete")
}


moveFiletoRespectiveFolder(); 















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









