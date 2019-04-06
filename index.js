var ExcelJS = require("exceljs/dist/es5/exceljs.browser");
var GoogleImages = require("google-images");

var client = new GoogleImages(
  "006031170630015664588:gdmowpph51a",
  "AIzaSyDgidm7cDuAz5_ub0G4khTWXo1-kNxdbPY"
);

function getProductImage(keyword) {
  return client.search(`tiki ${keyword}`);
}

function readFile(filename) {
  const workbook = new ExcelJS.Workbook();
  workbook.xlsx.readFile(filename).then(data => {
    // use workbook
    console.log(data);
  });
}

readFile("/Users/monkey/Desktop/x.xlsx");
