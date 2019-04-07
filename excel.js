var ExcelJS = require("exceljs");
// const XlsxPopulate = require("xlsx-populate");
var GoogleImages = require("google-images");
const base64Img = require("base64-img");
const imageDataURI = require("image-data-uri");

var client = new GoogleImages(
	"006031170630015664588:gdmowpph51a",
	"AIzaSyDgidm7cDuAz5_ub0G4khTWXo1-kNxdbPY"
);

function getProductImageBase64(keyword) {
	return new Promise(resolve => {
		client.search(`tiki ${keyword}`).then(data => {
			if (data.length === 0) {
				resolve({
					base64: null,
					extension: null
				});
				return;
			}

			const url = data[0].url;
			console.log(url);
			// imageDataURI.encodeFromURL(url).then(res => {
			// 	resolve({
			// 		base64: res,
			// 		extension: data[0].type.split("image/")[1]
			// 	});
			// });
			resolve({
				base64: res,
				url,
				extension: data[0].type.split("image/")[1]
			});
		});
		// const url = "https://tikicdn.com/media/launcher_icon.png";
		// imageDataURI.encodeFromURL(url).then(res => {
		// 	resolve({
		// 		base64: res,
		// 		extension: "png"
		// 	});
		// });

		// base64Img.requestBase64(url, function(err, res, body) {
		// 	resolve({
		// 		base64: body,
		// 		extension: "png"
		// 	});
		// });
	});
}

function createWorkBook() {
	const workbook = new ExcelJS.Workbook();
	workbook.created = new Date();
	workbook.creator = "Dao Nam Tien";
	workbook.lastModifiedBy = "Dao Nam Tien";
	workbook.created = new Date();
	workbook.modified = new Date();
	workbook.lastPrinted = new Date();

	return workbook;
}

function readFile(filename) {
	const workbook = new ExcelJS.Workbook();
	return workbook.xlsx.readFile(filename);
}

function makeFile(filename, newFileName) {
	const workbook = createWorkBook();
	const worksheetOptions = {
		properties: { tabColor: { argb: "FFC0000" } },
		views: [{ xSplit: 1, ySplit: 1 }],
		state: "visible"
	};

	return new Promise(resolve => {
		readFile(filename).then(data => {
			let newWorksheet = workbook.addWorksheet("All", worksheetOptions);
			let currentWorksheet = data.getWorksheet("Elec");

			const lastRowNum = currentWorksheet.rowCount;
			currentWorksheet.eachRow((row, rowNum) => {
				if (rowNum !== lastRowNum) {
					if (rowNum === 0) {
						newWorksheet.addRow(["Image", ...row.values]);
					} else {
						newWorksheet.addRow(["", ...row.values]);
					}
					// Object.assign(r, row);
				}
				if (rowNum >= 1) {
					getProductImageBase64(row.getCell(4).value).then(
						({ base64, extension, url }) => {
							if (!base64) return;
							// const imageId = workbook.addImage({
							// 	base64,
							// 	extension
							// });
							// newWorksheet.addImage(imageId, `A${rowNum + 1}:B${rowNum + 1}`);
						}
					);
				}
			});
			console.log("xx");
			// const imageId = workbook.addImage({
			// 	filename: "/Users/monkey/Desktop/launcher_icon.png",
			// 	extension: "png"
			// });
			// newWorksheet.addImage(imageId, `A${rowNum + 1}:B${rowNum + 1}`);
			// getProductImageBase64("x").then(({ base64, extension }) => {
			// 	console.log(base64);
			// });
			workbook.xlsx.writeFile(newFileName).then(function() {
				resolve({ a: "AAAA" });
			});
		});
	});
}

module.exports = {
	makeFile,
	getProductImageBase64
};
