var express = require('express');
var fs = require('fs');
var router = express.Router();

var multer = require('multer');
var upload = multer({dest:"../uploads"});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
    console.log(req.files);
    res.render('index', { title: 'Express' });
});

router.post('/upload', upload.single('upload'), function(req,res) {
  console.log(req.file);
  var tmpPath = req.file.path; // /tmp/파일이름
  //var index = tmpPath.split('\\').length; //임시 디렉토리를 제외한 파일이름만 얻기 위해서...
  var fileName = req.file.filename;

  var newPath = "../public/images/" + fileName;

  fs.rename(tmpPath, newPath, function (err) {
    if (err) {
      console.log(err);
      return;
    }

    var html;

    html = "";
    html += "<script type='text/javascript'>";
    html += " var funcNum = " + req.query.CKEditorFuncNum + ";";
    html += " var url = \"/images/" + fileName + "\";";
    html += " var message = \"Uploaded file successfully\";";
    html += "";
    html += " window.parent.CKEDITOR.tools.callFunction(funcNum, url);";
    html += "</script>";

    res.send(html);
  });
});

module.exports = router;
