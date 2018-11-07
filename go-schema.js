#!/usr/bin/node
// go-schema.js

var MongoClient = require('mongodb').MongoClient,
    commandLineArgs = require('command-line-args'), 
    assert = require('assert'),
    dumpOb = require ('go-util').dumpOb;


var doFull = false;
var doAll = false;
var doKeysOnly = false;
var options = commandLineOptions();

var url = 'mongodb://localhost:27017/' + options.database;

MongoClient.connect(url, function(err, db) {

    assert.equal(err, null);
    console.log("Successfully connected to MongoDB.");
    
    var cursor = db.collection(options.collection).find({});
    
    var docsAll = [];
    var struct = {};

    cursor.forEach(
        function(doc) {
            if (doKeysOnly) {

                var keys = Object.keys (doc);
                keys.forEach (function (key) {
                    
                    struct [key] = 1;
                });
            
            } else if (doAll) {

                docsAll.push (doc);

            } else {

                doOb (struct, doc);

            } // end if (doKeysOnly)
            
        },
        function(err) {
            assert.equal(err, null);
            var resAll = doVal (null, docsAll);
            if (doKeysOnly) {

                var keys = Object.keys (struct);
                console.log (dumpOb (keys));
            
            } else if (doAll) {

                console.log (dumpOb (resAll));

            } else {

                console.log (dumpOb (struct));

            } // end if (doKeysOnly)
            
            return db.close();
        }
    );

});


function commandLineOptions() {

    var cli = commandLineArgs([
        { name: "database", alias: "d", type: String },
        { name: "collection", alias: "c", type: String },
        { name: "keysonly", alias: "k"},
        { name: "all", alias: "a"},
        { name: "full", alias: "f"}
    ]);
    
    var options = cli.parse();
    if (! (('database' in options) && ('collection' in options))) {
        console.log(cli.getUsage({
            title: "Usage",
            description: "You must specify database and collection.\n\n" +
                "Outputs document keys and their types, recursively traversing objects and arrays.  " +
                "Unless 'all' option is specified, outputs one composite meta-document reflecting" +
                "the structure of all the documents such that if any key appears in any document," +
                "then those keys are included in the composite.\n\n" +
                "Optional arguments:\n\n" +
                "keysonly => only outputs primary keys from all documents\n\n" +
                "all => Outputs a separate meta-document for each document type. If every document has the same structure then only one meta-document will be output. This option is useful to identify if documents have varying structures and outputs a meta-document for each document unique type.\n\n" +
                "full => If not specified, the uniqueness of documents is determined by key names only. Specifying 'full' includes the types of keys for determining unique signatures.\n" +
                "\n" + ""
        }));
        process.exit();
    }

    if ('all' in options) {

        doAll = true;

    } // end if ('all' in options)
    
    if ('full' in options) {

        doFull = true;

    } // end if ('full' in options)
    
    if ('keysonly' in options) {

        doKeysOnly = true;

    } // end if ('keysonly' in options)
    

    return options;
    
}

function genSig (ob) {

    var res;
    if (Array.isArray (ob)) {

        res = JSON.stringify (ob.sort ());

    } else if (typeof ob === 'object') {

        var newOb = {};
        var keys = Object.keys (ob).sort ();
        for (var ix = 0; ix < keys.length; ix++) {

            var key = keys [ix];
            newOb [key] = ob [key];

        } // end for (var ix = 0; ix < keys.length; ix++)

        res = JSON.stringify (newOb);
        
    } else {

        res = JSON.stringify (ob);

    } // end if (Array.isArray (ob))
    
    return res;
}

function doOb(ob, ob0) {

    var k0 = Object.keys (ob0);
    k0.forEach (function (key) {
        var val0;

        if (typeof ob !== 'object') {

            console.log (key + ' has type ' + ob + ' in a previous document and is also an object in another document');
            val0 = ob;

        } else if (ob !== null && key in ob) {

            val0 = ob [key];

        } else {

            val0 = null;

        } // end if (typeof ob !== 'object')
        
        ob [key] = doVal (val0, ob0 [key]);

    });
}

function doVal(val0, val) {
    var res;
    var typeVal = typeof val;

    if (val === null) {

        res = val0 !== null ? val0 : null;

    } else if (Array.isArray (val)) {

        var sigS;

            // last man standing: previous non-array value for val0 will be overwritten by later vals that are arrays
        if (val0 === null || !Array.isArray (val0)) {

            sigS = {};
            res = [];
            res.sigS = sigS;

        } else {

            res = val0;
            sigS = res.sigS;

        } // end if (val0 === null)
        

        for (var ix = 0; ix < val.length; ix++) {

            var el = val [ix];

            var valI = doVal (null, el);
            var sig;
            var valIType = typeof valI;
            if (valIType === 'string' || valI === null) {

                sig = valI;

            } else if (!doFull && valIType === 'object' && !Array.isArray (valI)) {

                sig = genSig (Object.keys (valI));

            } else {

                sig = genSig (valI);

            } // end if (typeof valI === 'string')
            
            if (!sigS.hasOwnProperty (sig)) {

                sigS [sig] = 1;
                res.push (valI);

            } // end if (!sigS.hasOwnProperty (sig))

        } // end for (var ix = 0; ix < val.length; ix++)
        
    } else if (typeVal === 'object') {

        if ('_bsontype' in val &&  val._bsontype === 'ObjectID') {

            res = 'ObjectId';

        } else if (val instanceof RegExp) {

            res = 'RegExp';

        } else if (val instanceof Date) {

            res = 'Date';

        } else {

            res = val0 === null || typeof val0 !== 'object' ? {} : val0;
            doOb (res, val);

        } // end if (val instanceof ObjectId)
        

    } else {

        res = val0 !== null ? val0 : typeVal;


    } // end if (typeof val === null)

    return res;
    
}
