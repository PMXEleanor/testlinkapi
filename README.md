# pmxtestlinkapi
Version:1.0.0


'Test link api' is for node application with test management tool testlink.Most of XML-RPC call is implemented. 

## Installation

Node based environments 

```sh
npm install pmxtestlinkapi
```
## API documentation:
Examples:

```sh
var TestLinkAPI = require('./testlinkapi.js');

			var devKey="";
			var RPCUrl="http://localhost:8081/testlink/lib/api/xmlrpc/v1/xmlrpc.php";
			var testprojectid=1;
			var testsuiteid=5;
			var testplanid=2;
			var testPlanId=2;
			var buildid=2;
			var testprojectname="Project1";
			var testplanname="Testplan1";
			var testcaseexternalid="123-1";
			var testcaseid=6;
			var filedownloadpath="C:/xampp/htdocs/pratice/";
			var custonfiledname="customfield1";
			var custonfiledvalue="updated Value";
			var summary="Summary";

//Creating Object 

var testlink=new TestLinkAPI(devKey,RPCUrl);	

//Get all test case name
testlink.getTestCaseNames(testprojectid,testsuiteid,function(TestcaseNames){
	
			console.log(testcasename);
});	

```
