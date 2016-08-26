/**
	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0
	  
	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
    Author:Brahmananda Kar
*/

var http 		= 	require('http'),
	fs          = 	require('fs'),
	utilites 	= 	require('./utilities'),
	jsonPath	=	require('JSONPath');
	dom 		= 	require('xmldom').DOMParser;

/**
* TestLink API Client brings you a pure JavaScript Node-Module for TestLink tool
*
* @class TestLinkApi
*/
 module.exports=TestLinkApi=function(devkey,rpcUrl,callback){
	this.url=rpcUrl;
	this.devkey=devkey;	
} 


/**
 * Retrieves Builds Created for TestPlan.
 *
 *	This has ben tested and works with the below parameters
 *
 *	@method getBuildsForTestPlan
 * 	@param 	{object}	 testplanid
 * 	@param 	{function} 	 callback
 * 	@return	{Json Object}JSON Object for Builds
 */
TestLinkApi.prototype.getBuildsForTestPlan = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "getBuildsForTestPlan",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testplanid: {
            value: params.testplanid,
            type: "int"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
		var buildsfortestplan = utilites.getJsObjectByXmlResponse(response);
		callback(buildsfortestplan);
	});
};

/**
 * Retrieves Platforms Assigned for Project.
 *
 *  This has ben tested and works with the below parameters
 *
 *	@method  getProjectPlatforms
 * 	@param 	{object} 	 testprojectid
 * 	@param  {function} 	 callback
 * 	@return	{Json Object}JSON Object for Project Platforms
 */
TestLinkApi.prototype.getProjectPlatforms = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "getProjectPlatforms",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testprojectid: {
            value: params.testprojectid,
            type: "int"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
		var projectPlatforms = utilites.getJsObjectByXmlResponse(response);
		callback(projectPlatforms);
	});
};

/**
 * Retrieves TestPlans Created for Project.
 *
 *  This has ben tested and works with the below parameters
 *
 *	@method	getProjectTestPlans
 * 	@param 	{object}	 testprojectid
 * 	@param  {function} 	 callback
 * 	@return	{Json Object}JSON Object for Project TestPlan(s)
 */
TestLinkApi.prototype.getProjectTestPlans = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "getProjectTestPlans",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testprojectid: {
            value: params.testprojectid,
            type: "int"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var projectPlans = utilites.getJsObjectByXmlResponse(response);
       callback(projectPlans);
    });
};

/**
 * Retrieves Created Test Projects.
 *
 *  This has ben tested and works with the below parameters
 *
 *	@method	getProjects
 * 	@param 	{function} 	 callback
 * 	@return	{Json Object}JSON Object for Project(s)
 */
TestLinkApi.prototype.getProjects = function(callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "getProjects",
        devKey: {
            value: this.devkey,
            type: "string"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var projects = utilites.getJsObjectByXmlResponse(response);
        callback(projects);
    });
};

/**
 * Retrieves Created TestCase based on External Id.
 *
 *  This has ben tested and works with the below parameters
 *
 *	@method	getTestCase
 * 	@param  {function}	 callback
 * 	@param 	{object} 	 testcaseid
 * 	@return	{Json Object}JSON Object for TestCase
 */
TestLinkApi.prototype.getTestCase = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "getTestCase",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testcaseid: {
            value: params.testcaseid,
            type: "string"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var testcase = utilites.getJsObjectByXmlResponse(response);
        callback(testcase);
    });
};

/**
 * Get attached files for a TestCase.
 *
 *	@method	getTestCaseAttachments
 * 	@param 	 {object}  testcaseid
 * 	@param 	 {object}  downloadpath
 *	@param	 {function}callback
 */
TestLinkApi.prototype.getTestCaseAttachments = function(params, downloadpath, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "getTestCaseAttachments",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testcaseid: {
            value: params.testcaseid,
            type: "string"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var attachments = utilites.getJsObjectByXmlResponse(response),
			component_names = jsonPath.eval(attachments, "$..name"),
			component_contents = jsonPath.eval(attachments, "$..content"),
			index = 0;
        component_contents.map(function(content) {
            var buf = new Buffer(content, 'base64');
            fs.writeFile(downloadpath + component_names[index++], buf, function(err) {
                if (err) throw err;
                console.log('File Has Been Downloaded');
				callback();
            });
        });
    });
};

/**
 * Retrieves Custom Field Design Value Created for TestCase.
 *
 * This has ben tested and works with the below parameters
 *
 *	@method  getTestCaseCustomFieldDesignValue
 *	@param 	{object}  	 testprojectid
 * 	@param 	{object}  	 testcaseid
 * 	@param 	{object}  	 customfieldname
 * 	@param 	{object}  	 details
 * 	@param 	{object}  	 version
 * 	@param 	{function}	 callback
 * 	@return	{Json Object}JSON Object for TestCase Custom field Value
 */
TestLinkApi.prototype.getTestCaseCustomFieldDesignValue = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "getTestCaseCustomFieldDesignValue",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testprojectid: {
            value: params.testprojectid,
            type: "int"
        },
        testcaseid: {
            value: params.testcaseid,
            type: "string"
        },
        customfieldname: {
            value: params.customfieldname,
            type: "string"
        },
        details: {
            value: params.details,
            type: "string"
        },
        version: {
            value: params.version,
            type: "int"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var customFieldValue = utilites.getJsObjectByXmlResponse(response);
		callback(customFieldValue);
    });
};

/**
 * Retrieves Created TestCase(s) for a TestPlan
 *
 * This has ben tested and works with the below parameters
 *	
 *	@method getTestCasesForTestPlan
 *	@param 	{object}	 testplanid
 * 	@param 	{function}	 callback
 * 	@return	{Json object}JSON Object for TestCases(s)
 */
TestLinkApi.prototype.getTestCasesForTestPlan = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "getTestCasesForTestPlan",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testplanid: {
            value: params.testplanid,
            type: "int"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var plantestCases = utilites.getJsObjectByXmlResponse(response);
        callback(plantestCases);
    });
};

/**
 * Retrieves Created TestCase(s) for a TestSuite
 *
 * This has ben tested and works with the below parameters
 *
 *	@method	getTestCasesForTestSuite
 *	@param 	{object}	 testprojectid
 *	@param 	{object}	 testsuiteid
 * 	@param 	{function}	 callback
 * 	@return	{Json Object}JSON Object for TestCases(s)
 */
TestLinkApi.prototype.getTestCasesForTestSuite = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "getTestCasesForTestSuite",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testprojectid: {
            value: params.testprojectid,
            type: "int"
        },
        testsuiteid: {
            value: params.testsuiteid,
            type: "int"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var suitetestcases = utilites.getJsObjectByXmlResponse(response);
        callback(suitetestcases);
    });
};

/**
 * Retrieves Created TestCase based on name
 *
 * This has ben tested and works with the below parameters
 *
 *	@method	getTestCaseIDByName
 *	@param 	{object}	 testcasename
 * 	@param 	{function}	 callback
 * 	@return	{Json Object}JSON Object for TestCase
 */
TestLinkApi.prototype.getTestCaseIDByName = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "getTestCaseIDByName",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testcasename: {
            value: params.testcasename,
            type: "string"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var testcaseid = utilites.getJsObjectByXmlResponse(response);
        callback(testcaseid);
    });
};

/**
 * Retrieves TestPlan and its Properties
 *
 * This has ben tested and works with the below parameters
 *
 *	@method	getTestPlanByName
 *	@param 	{object}	 testprojectname
 * 	@param 	{object}	 testplanname
 * 	@param 	{function}	 callback
 * 	@return	{Json Object}JSON Object for TestPlan
 */
TestLinkApi.prototype.getTestPlanByName = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "getTestPlanByName",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testprojectname: {
            value: params.testprojectname,
            type: "string"
        },
        testplanname: {
            value: params.testplanname,
            type: "string"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var planName = utilites.getJsObjectByXmlResponse(response);
        callback(planName);
    });
};

/**
 * Retrieves Platforms Assigned for TestPlan
 *
 * This has ben tested and works with the below parameters
 *
 *	@method	getTestPlanPlatforms
 *	@param 	{object}	 testplanid
 * 	@param 	{function}	 callback
 * 	@return	{Json Object}JSON Object for Platform
 */
TestLinkApi.prototype.getTestPlanPlatforms = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "getTestPlanPlatforms",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testplanid: {
            value: params.testplanid,
            type: "string"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var platforms = utilites.getJsObjectByXmlResponse(response);
        callback(platforms);
    });
};

/**
 * Retrieves TestProject and its Properties
 *
 * This has ben tested and works with the below parameters
 *
 *	@method	getTestProjectByName
 *	@param 	{object}	 testprojectname
 * 	@param 	{function}	 callback
 * 	@return	{Json Object}JSON Object for Project
 */
TestLinkApi.prototype.getTestProjectByName = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "getTestProjectByName",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testprojectname: {
            value: params.testprojectname,
            type: "string"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var projectName = utilites.getJsObjectByXmlResponse(response);
        callback(projectName);
    });
};

/**
 * Retrieves TestSuites created for TestPlan(s)
 *
 * This has ben tested and works with the below parameters
 *
 *	@method	getTestSuitesForTestPlan
 *	@param 	{object}	 testplanid
 * 	@param 	{function}	 callback
 * 	@return	{Json Object}JSON Object for TestSuite
 */
TestLinkApi.prototype.getTestSuitesForTestPlan = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "getTestSuitesForTestPlan",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testplanid: {
            value: params.testplanid,
            type: "int"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var testSuites = utilites.getJsObjectByXmlResponse(response);
   		callback(testSuites);
    });
};

/**
 * Retrieves Child TestSuite(s) created under a TestSuite(s)
 *
 * This has ben tested and works with the below parameters
 *
 *	@method	getTestSuitesForTestSuite
 *	@param 	{object}	 testsuiteid
 * 	@param 	{function}	 callback
 * 	@return	{Json Object}JSON Object for TestSuite
 */
TestLinkApi.prototype.getTestSuitesForTestSuite = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "getTestSuitesForTestSuite",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testsuiteid: {
            value: params.testsuiteid,
            type: "int"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var testsuites = utilites.getJsObjectByXmlResponse(response);
      callback(testsuites);
    });
};

/**
 * Retrieves User and user properties
 *
 * This has ben tested and works with the below parameters
 *
 *	@method	getUserByID
 *	@param 	{object}	 userid
 * 	@param 	{function}	 callback
 * 	@return	{Json Object}JSON Object for User
 */
TestLinkApi.prototype.getUserByID = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "getUserByID",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        userid: {
            value: params.userid,
            type: "int"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var userByID = utilites.getJsObjectByXmlResponse(response);
        callback(userByID);
    });
};

/**
 * Retrieves LoggedIn User and properties
 *
 * This has ben tested and works with the below parameters
 *
 *	@method getUserByLogin
 *	@param 	{object}	 user
 * 	@param 	{function}	 callback
 * 	@return	{Json Object}JSON Object for User
 */
TestLinkApi.prototype.getUserByLogin = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "getUserByLogin",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        user: {
            value: params.user,
            type: "string"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var userByLogin = utilites.getJsObjectByXmlResponse(response);
        callback(userByLogin);
    });
};

/**
 * Uploads a Given file to TestCase
 *
 * This has ben tested and works with the below parameters
 *
 *	@method	uploadTestCaseAttachment
 *	@param 	{object}  testcaseid
 *	@param 	{object}  title
 *	@param 	{object}  filename
 * 	@param 	{object}  uploadpath
 *	@param	{function}callback
 */
TestLinkApi.prototype.uploadTestCaseAttachment = function(params, callback) {
    var post = utilites.postCompose(this.url),
		bitmap = fs.readFileSync(params.uploadpath + params.filename),
		content = new Buffer(bitmap).toString('base64'),
		inputObject = {
        methodName: "uploadTestCaseAttachment",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testcaseid: {
            value: params.testcaseid,
            type: "int"
        },
        title: {
            value: params.title,
            type: "string"
        },
        filename: {
            value: params.filename,
            type: "string"
        },
        content: {
            value: content,
            type: "string"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {});
	callback();
};

/*To Get DevKey
 *
 *	@method	getDevKey
 *	@param	{function}callback
 *
*/
TestLinkApi.prototype.getDevKey = function(callback) {
    return this.devkey
};

/*To Get the URL
 *
 *	@method getUrl
 *	@param {function}callback
 *
*/
TestLinkApi.prototype.getUrl = function(callback) {
    return this.url
};

/**
 * Retrieves Execution Counters for Build
 *
 *	@method getExecCountersByBuild
 *	@param 	{object}	 testplanid
 *	@param 	{function}	 callback
 * 	@return	{Json Object}JSON Object for Execution Counters
 */
TestLinkApi.prototype.getExecCountersByBuild = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "getExecCountersByBuild",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testplanid: {
            value: params.testplanid,
            type: "int"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var execCounters = utilites.getJsObjectByXmlResponse(response);
        callback(execCounters);
    });
};

/**
 * Retrieves First Level of TestSuites in a Project
 *
 * This has ben tested and works with the below parameters
 *
 *	@method getFirstLevelTestSuitesForTestProject
 *	@param 	{object}	 testprojectid
 *	@param 	{function}	 callback
 * 	@return	{Json Object}JSON Object for TestSuite
 */
TestLinkApi.prototype.getFirstLevelTestSuitesForTestProject = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "getFirstLevelTestSuitesForTestProject",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testprojectid: {
            value: params.testprojectid,
            type: "int"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var firstLevelSuite = utilites.getJsObjectByXmlResponse(response);
		callback(firstLevelSuite);
    });
};
/**
 * Retrieves Full Path for a Node
 *
 * This has ben tested and works with the below parameters
 *
 *	@method getFullPath
 *	@param 	{object}     nodeid
 *	@param 	{function}	 callback
 * 	@return	{Json Object}JSON Object for FullPath
 */
TestLinkApi.prototype.getFullPath = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "getFullPath",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        nodeid: {
            value: params.nodeid,
            type: "int"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var fullpath = utilites.getJsObjectByXmlResponse(response);
        callback(fullpath);
    });
};

/**
 * Retrieves Last Execution Result for a TestCase
 *
 * This has ben tested and works with the below parameters
 *
 *	@method	getLastExecutionResult
 *	@param 	{object}	 testplanid
 *	@param 	{object}	 testcaseid
 *	@param 	{function}	 callback
 * 	@return	{Json Object}JSON Object for Last Execution Result
 */
TestLinkApi.prototype.getLastExecutionResult = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "getLastExecutionResult",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testplanid: {
            value: params.testplanid,
            type: "int"
        },
        testcaseid: {
            value: params.testcaseid,
            type: "string"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var lastresult = utilites.getJsObjectByXmlResponse(response);
        callback(lastresult);
    });
};

/**
 * Un-Assign a Platform for a given TestPlan
 *
 * This has ben tested and works with the below parameters
 *
 *	@method removePlatformFromTestPlan
 *	@param 	{object}	 testplanid
 *	@param 	{object}	 platformname
 *	@param 	{function}	 callback
 * 	@return	{Json Object}JSON Object for a PlatformTestPlan
 */
TestLinkApi.prototype.removePlatformFromTestPlan = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "removePlatformFromTestPlan",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testplanid: {
            value: params.testplanid,
            type: "int"
        },
        platformname: {
            value: params.platformname,
            type: "string"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var removeplatform = utilites.getJsObjectByXmlResponse(response);
        callback(removeplatform);
    });
};

/**
 * Update Result for a given TestCase.
 *
 * This has ben tested and works with the below parameters
 *
 *	@method	reportTCResult
 *	@param 	{object}	 testplanid
 *	@param 	{object} 	 testcaseid
 *	@param 	{object}	 buildid
 *	@param 	{object}	 notes
 *	@param 	{object}	 status
 *	@param 	{object}	 platformname
 *	@param 	{object}	 user
 *	@param 	{object}	 bugid
 *	@param 	{function}	 callback
 * 	@return	{Json object}JSON Object for TestCase Result
 */
TestLinkApi.prototype.reportTCResult = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "reportTCResult",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testplanid: {
            value: params.testplanid,
            type: "int"
        },
        testcaseid: {
            value: params.testcaseid,
            type: "string"
        },
        buildid: {
            value: params.buildid,
            type: "string"
        },
        notes: {
            value: params.notes,
            type: "string"
        },
        status: {
            value: params.status,
            type: "string"
        },
        platformname: {
            value: params.platformname,
            type: "string"
        },
        user: {
            value: params.user,
            type: "string"
        },
        bugid: {
            value: params.bugid,
            type: "string"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var tcresult = utilites.getJsObjectByXmlResponse(response);
        callback(tcresult);
    });
};

/**
 * Overwrite Result for a given TestCase.
 *
 * This has ben tested and works with the below parameters
 *
 *	@method reportTCResultOverwrite
 *	@param 	{object}	 testplanid
 *	@param 	{object}	 testcaseid
 *	@param 	{object} 	 buildid
 *	@param 	{object}	 notes
 *	@param 	{object}	 status
 *	@param 	{object}	 platformname
 *	@param 	{object}	 overwrite
 *	@param 	{object}	 user
 *	@param 	{object}	 bugid
 *	@param 	{function}	 callback
 * 	@return	{Json object}JSON Object for TestCase Result
 */
TestLinkApi.prototype.reportTCResultOverwrite = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "reportTCResult",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testplanid: {
            value: params.testplanid,
            type: "int"
        },
        testcaseid: {
            value: params.testcaseid,
            type: "string"
        },
        buildid: {
            value: params.buildid,
            type: "string"
        },
        notes: {
            value: params.notes,
            type: "string"
        },
        status: {
            value: params.status,
            type: "string"
        },
        platformname: {
            value: params.platformname,
            type: "string"
        },
        user: {
            value: params.user,
            type: "string"
        },
        bugid: {
            value: params.bugid,
            type: "string"
        },
        overwrite: {
            value: params.overwrite,
            type: "boolean"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var resultoverwrite = utilites.getJsObjectByXmlResponse(response);
        callback(resultoverwrite);
    });
};


/**
 * 	Set the Execution Type for a given TestCase.
 *
 * 	This has ben tested and works with the below parameters
 *
 *	@method	setTestCaseExecutionType
 *	@param 	{object}	 testprojectid
 *	@param 	{object}	 testcaseid
 *  @param	{object}	 version
 *	@param 	{object}	 executiontype
 *	@param 	{function}	 callback
 * 	@return	{Json object}JSON Object for TestCase Execution Type
 */
TestLinkApi.prototype.setTestCaseExecutionType = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "setTestCaseExecutionType",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testprojectid: {
            value: params.testprojectid,
            type: "int"
        },
        testcaseid: {
            value: params.testcaseid,
            type: "string"
        },
        version: {
            value: params.version,
            type: "int"
        },
        executiontype: {
            value: params.executiontype,
            type: "int"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var testcaseexecutiontype = utilites.getJsObjectByXmlResponse(response);
        callback(testcaseexecutiontype);
    });
};

/**
 * 	Retrieves TestList Version.
 *
 * 	This has ben tested and works with the below parameters
 *
 *	@method	getTestLinkVersion
 *	@param 	{function}	 callback
 * 	@return	{Json Object}JSON Object for version
 */
TestLinkApi.prototype.getTestLinkVersion = function(callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "testLinkVersion",
        devKey: {
            value: this.devkey,
            type: "string"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var testlinkversion = utilites.getJsObjectByXmlResponse(response);
        callback(testlinkversion);
    });
};

/**
 * 	Update TestCase Version and Summary.
 *
 * 	This has ben tested and works with the below parameters
 *
 *	@method	updateTestCase
 *	@param	{object}	 testcaseid
 *	@param	{object}	 version
 *	@param	{object}	 summary
 *	@param	{function}	 callback
 * 	@return	{Json object}JSON Object for TestCase
 */
TestLinkApi.prototype.updateTestCase = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "updateTestCase",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testcaseid: {
            value: params.testcaseid,
            type: "string"
        },
        version: {
            value: params.version,
            type: "int"
        },
        summary: {
            value: params.summary,
            type: "string"
        }
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var updatetc = utilites.getJsObjectByXmlResponse(response);
        callback(updatetc);
    });
};

/**
 * 	Update TestCase Custom Field Design Values.
 *
 *	@method	updateTestCaseCustomFieldDesignValue
 *	@param 	{object}	 testprojectid
 *	@param 	{object}	 testcaseexternalid
 *	@param 	{object}	 version
 *	@param 	{object}	 customfieldname
 *	@param 	{object}	 customfieldvalue
 *	@param 	{function}	 callback
 * 	@return	{Json object}JSON Object for TestCase
 */
TestLinkApi.prototype.updateTestCaseCustomFieldDesignValue = function(params, callback) {
    var post = utilites.postCompose(this.url),
		inputObject = {
        methodName: "updateTestCaseCustomFieldDesignValue",
        devKey: {
            value: this.devkey,
            type: "string"
        },
        testprojectid: {
            value: params.testprojectid,
            type: "int"
        },
        testcaseid: {
            value: params.testcaseid,
            type: "int"
        },
        version: {
            value: params.version,
            type: "string"
        },
        customfields: [{
            name: params.custonfieldname,
            value: params.custonfieldvalue,
            type: "String"
        }]
    },
		body = utilites.getRequestByObject(inputObject);
    utilites.postRequest(post, body, function(response) {
        var customfield = utilites.getJsObjectByXmlResponse(response);
        callback(customfield);
    });
};


