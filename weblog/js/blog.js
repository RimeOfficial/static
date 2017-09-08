// http://unminify.com/

var COMPILED = !0,
    goog = goog || {};
goog.global = this;
goog.isDef = function(a) {
    return void 0 !== a
};
goog.exportPath_ = function(a, b, c) {
    a = a.split(".");
    c = c || goog.global;
    a[0] in c || !c.execScript || c.execScript("var " + a[0]);
    for (var d; a.length && (d = a.shift());) !a.length && goog.isDef(b) ? c[d] = b : c = c[d] ? c[d] : c[d] = {}
};
goog.define = function(a, b) {
    var c = b;
    COMPILED || (goog.global.CLOSURE_UNCOMPILED_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_UNCOMPILED_DEFINES, a) ? c = goog.global.CLOSURE_UNCOMPILED_DEFINES[a] : goog.global.CLOSURE_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_DEFINES, a) && (c = goog.global.CLOSURE_DEFINES[a]));
    goog.exportPath_(a, c)
};
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.TRUSTED_SITE = !0;
goog.STRICT_MODE_COMPATIBLE = !1;
goog.DISALLOW_TEST_ONLY_CODE = COMPILED && !goog.DEBUG;
goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING = !1;
goog.provide = function(a) {
    if (!COMPILED && goog.isProvided_(a)) throw Error('Namespace "' + a + '" already declared.');
    goog.constructNamespace_(a)
};
goog.constructNamespace_ = function(a, b) {
    if (!COMPILED) {
        delete goog.implicitNamespaces_[a];
        for (var c = a;
            (c = c.substring(0, c.lastIndexOf("."))) && !goog.getObjectByName(c);) goog.implicitNamespaces_[c] = !0
    }
    goog.exportPath_(a, b)
};
goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
goog.module = function(a) {
    if (!goog.isString(a) || !a || -1 == a.search(goog.VALID_MODULE_RE_)) throw Error("Invalid module identifier");
    if (!goog.isInModuleLoader_()) throw Error("Module " + a + " has been loaded incorrectly.");
    if (goog.moduleLoaderState_.moduleName) throw Error("goog.module may only be called once per module.");
    goog.moduleLoaderState_.moduleName = a;
    if (!COMPILED) {
        if (goog.isProvided_(a)) throw Error('Namespace "' + a + '" already declared.');
        delete goog.implicitNamespaces_[a]
    }
};
goog.module.get = function(a) {
    return goog.module.getInternal_(a)
};
goog.module.getInternal_ = function(a) {
    if (!COMPILED) return goog.isProvided_(a) ? a in goog.loadedModules_ ? goog.loadedModules_[a] : goog.getObjectByName(a) : null
};
goog.moduleLoaderState_ = null;
goog.isInModuleLoader_ = function() {
    return null != goog.moduleLoaderState_
};
goog.module.declareLegacyNamespace = function() {
    if (!COMPILED && !goog.isInModuleLoader_()) throw Error("goog.module.declareLegacyNamespace must be called from within a goog.module");
    if (!COMPILED && !goog.moduleLoaderState_.moduleName) throw Error("goog.module must be called prior to goog.module.declareLegacyNamespace.");
    goog.moduleLoaderState_.declareLegacyNamespace = !0
};
goog.setTestOnly = function(a) {
    if (goog.DISALLOW_TEST_ONLY_CODE) throw a = a || "", Error("Importing test-only code into non-debug environment" + (a ? ": " + a : "."));
};
goog.forwardDeclare = function(a) {};
COMPILED || (goog.isProvided_ = function(a) {
    return a in goog.loadedModules_ || !goog.implicitNamespaces_[a] && goog.isDefAndNotNull(goog.getObjectByName(a))
}, goog.implicitNamespaces_ = {
    "goog.module": !0
});
goog.getObjectByName = function(a, b) {
    for (var c = a.split("."), d = b || goog.global, e; e = c.shift();)
        if (goog.isDefAndNotNull(d[e])) d = d[e];
        else return null;
    return d
};
goog.globalize = function(a, b) {
    var c = b || goog.global,
        d;
    for (d in a) c[d] = a[d]
};
goog.addDependency = function(a, b, c, d) {
    if (goog.DEPENDENCIES_ENABLED) {
        var e;
        a = a.replace(/\\/g, "/");
        for (var f = goog.dependencies_, g = 0; e = b[g]; g++) f.nameToPath[e] = a, f.pathIsModule[a] = !!d;
        for (d = 0; b = c[d]; d++) a in f.requires || (f.requires[a] = {}), f.requires[a][b] = !0
    }
};
goog.ENABLE_DEBUG_LOADER = !0;
goog.logToConsole_ = function(a) {
    goog.global.console && goog.global.console.error(a)
};
goog.require = function(a) {
    if (!COMPILED) {
        goog.ENABLE_DEBUG_LOADER && goog.IS_OLD_IE_ && goog.maybeProcessDeferredDep_(a);
        if (goog.isProvided_(a)) return goog.isInModuleLoader_() ? goog.module.getInternal_(a) : null;
        if (goog.ENABLE_DEBUG_LOADER) {
            var b = goog.getPathFromDeps_(a);
            if (b) return goog.writeScripts_(b), null
        }
        a = "goog.require could not find: " + a;
        goog.logToConsole_(a);
        throw Error(a);
    }
};
goog.basePath = "";
goog.nullFunction = function() {};
goog.abstractMethod = function() {
    throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(a) {
    a.getInstance = function() {
        if (a.instance_) return a.instance_;
        goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = a);
        return a.instance_ = new a
    }
};
goog.instantiatedSingletons_ = [];
goog.LOAD_MODULE_USING_EVAL = !0;
goog.SEAL_MODULE_EXPORTS = goog.DEBUG;
goog.loadedModules_ = {};
goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER;
goog.DEPENDENCIES_ENABLED && (goog.dependencies_ = {
        pathIsModule: {},
        nameToPath: {},
        requires: {},
        visited: {},
        written: {},
        deferred: {}
    }, goog.inHtmlDocument_ = function() {
        var a = goog.global.document;
        return null != a && "write" in a
    }, goog.findBasePath_ = function() {
        if (goog.isDef(goog.global.CLOSURE_BASE_PATH)) goog.basePath = goog.global.CLOSURE_BASE_PATH;
        else if (goog.inHtmlDocument_())
            for (var a = goog.global.document.getElementsByTagName("SCRIPT"), b = a.length - 1; 0 <= b; --b) {
                var c = a[b].src,
                    d = c.lastIndexOf("?"),
                    d = -1 == d ? c.length :
                    d;
                if ("base.js" == c.substr(d - 7, 7)) {
                    goog.basePath = c.substr(0, d - 7);
                    break
                }
            }
    }, goog.importScript_ = function(a, b) {
        (goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_)(a, b) && (goog.dependencies_.written[a] = !0)
    }, goog.IS_OLD_IE_ = !(goog.global.atob || !goog.global.document || !goog.global.document.all), goog.importModule_ = function(a) {
        goog.importScript_("", 'goog.retrieveAndExecModule_("' + a + '");') && (goog.dependencies_.written[a] = !0)
    }, goog.queuedModules_ = [], goog.wrapModule_ = function(a, b) {
        return goog.LOAD_MODULE_USING_EVAL &&
            goog.isDef(goog.global.JSON) ? "goog.loadModule(" + goog.global.JSON.stringify(b + "\n//# sourceURL=" + a + "\n") + ");" : 'goog.loadModule(function(exports) {"use strict";' + b + "\n;return exports});\n//# sourceURL=" + a + "\n"
    }, goog.loadQueuedModules_ = function() {
        var a = goog.queuedModules_.length;
        if (0 < a) {
            var b = goog.queuedModules_;
            goog.queuedModules_ = [];
            for (var c = 0; c < a; c++) goog.maybeProcessDeferredPath_(b[c])
        }
    }, goog.maybeProcessDeferredDep_ = function(a) {
        goog.isDeferredModule_(a) && goog.allDepsAreAvailable_(a) && (a = goog.getPathFromDeps_(a),
            goog.maybeProcessDeferredPath_(goog.basePath + a))
    }, goog.isDeferredModule_ = function(a) {
        return (a = goog.getPathFromDeps_(a)) && goog.dependencies_.pathIsModule[a] ? goog.basePath + a in goog.dependencies_.deferred : !1
    }, goog.allDepsAreAvailable_ = function(a) {
        if ((a = goog.getPathFromDeps_(a)) && a in goog.dependencies_.requires)
            for (var b in goog.dependencies_.requires[a])
                if (!goog.isProvided_(b) && !goog.isDeferredModule_(b)) return !1;
        return !0
    }, goog.maybeProcessDeferredPath_ = function(a) {
        if (a in goog.dependencies_.deferred) {
            var b =
                goog.dependencies_.deferred[a];
            delete goog.dependencies_.deferred[a];
            goog.globalEval(b)
        }
    }, goog.loadModuleFromUrl = function(a) {
        goog.retrieveAndExecModule_(a)
    }, goog.loadModule = function(a) {
        var b = goog.moduleLoaderState_;
        try {
            goog.moduleLoaderState_ = {
                moduleName: void 0,
                declareLegacyNamespace: !1
            };
            var c;
            if (goog.isFunction(a)) c = a.call(goog.global, {});
            else if (goog.isString(a)) c = goog.loadModuleFromSource_.call(goog.global, a);
            else throw Error("Invalid module definition");
            var d = goog.moduleLoaderState_.moduleName;
            if (!goog.isString(d) || !d) throw Error('Invalid module name "' + d + '"');
            goog.moduleLoaderState_.declareLegacyNamespace ? goog.constructNamespace_(d, c) : goog.SEAL_MODULE_EXPORTS && Object.seal && Object.seal(c);
            goog.loadedModules_[d] = c
        } finally {
            goog.moduleLoaderState_ = b
        }
    }, goog.loadModuleFromSource_ = function(a) {
        eval(a);
        return {}
    }, goog.writeScriptSrcNode_ = function(a) {
        goog.global.document.write('<script type="text/javascript" src="' + a + '">\x3c/script>')
    }, goog.appendScriptSrcNode_ = function(a) {
        var b = goog.global.document,
            c = b.createElement("script");
        c.type = "text/javascript";
        c.src = a;
        c.defer = !1;
        c.async = !1;
        b.head.appendChild(c)
    }, goog.writeScriptTag_ = function(a, b) {
        if (goog.inHtmlDocument_()) {
            var c = goog.global.document;
            if (!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING && "complete" == c.readyState) {
                if (/\bdeps.js$/.test(a)) return !1;
                throw Error('Cannot write "' + a + '" after document load');
            }
            var d = goog.IS_OLD_IE_;
            void 0 === b ? d ? (d = " onreadystatechange='goog.onScriptLoad_(this, " + ++goog.lastNonModuleScriptIndex_ + ")' ", c.write('<script type="text/javascript" src="' +
                a + '"' + d + ">\x3c/script>")) : goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING ? goog.appendScriptSrcNode_(a) : goog.writeScriptSrcNode_(a) : c.write('<script type="text/javascript">' + b + "\x3c/script>");
            return !0
        }
        return !1
    }, goog.lastNonModuleScriptIndex_ = 0, goog.onScriptLoad_ = function(a, b) {
        "complete" == a.readyState && goog.lastNonModuleScriptIndex_ == b && goog.loadQueuedModules_();
        return !0
    }, goog.writeScripts_ = function(a) {
        function b(a) {
            if (!(a in e.written || a in e.visited)) {
                e.visited[a] = !0;
                if (a in e.requires)
                    for (var f in e.requires[a])
                        if (!goog.isProvided_(f))
                            if (f in
                                e.nameToPath) b(e.nameToPath[f]);
                            else throw Error("Undefined nameToPath for " + f);
                a in d || (d[a] = !0, c.push(a))
            }
        }
        var c = [],
            d = {},
            e = goog.dependencies_;
        b(a);
        for (a = 0; a < c.length; a++) {
            var f = c[a];
            goog.dependencies_.written[f] = !0
        }
        var g = goog.moduleLoaderState_;
        goog.moduleLoaderState_ = null;
        for (a = 0; a < c.length; a++)
            if (f = c[a]) e.pathIsModule[f] ? goog.importModule_(goog.basePath + f) : goog.importScript_(goog.basePath + f);
            else throw goog.moduleLoaderState_ = g, Error("Undefined script input");
        goog.moduleLoaderState_ = g
    }, goog.getPathFromDeps_ =
    function(a) {
        return a in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[a] : null
    }, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js"));
goog.normalizePath_ = function(a) {
    a = a.split("/");
    for (var b = 0; b < a.length;) "." == a[b] ? a.splice(b, 1) : b && ".." == a[b] && a[b - 1] && ".." != a[b - 1] ? a.splice(--b, 2) : b++;
    return a.join("/")
};
goog.loadFileSync_ = function(a) {
    if (goog.global.CLOSURE_LOAD_FILE_SYNC) return goog.global.CLOSURE_LOAD_FILE_SYNC(a);
    var b = new goog.global.XMLHttpRequest;
    b.open("get", a, !1);
    b.send();
    return b.responseText
};
goog.retrieveAndExecModule_ = function(a) {
    if (!COMPILED) {
        var b = a;
        a = goog.normalizePath_(a);
        var c = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_,
            d = goog.loadFileSync_(a);
        if (null != d) d = goog.wrapModule_(a, d), goog.IS_OLD_IE_ ? (goog.dependencies_.deferred[b] = d, goog.queuedModules_.push(b)) : c(a, d);
        else throw Error("load of " + a + "failed");
    }
};
goog.typeOf = function(a) {
    var b = typeof a;
    if ("object" == b)
        if (a) {
            if (a instanceof Array) return "array";
            if (a instanceof Object) return b;
            var c = Object.prototype.toString.call(a);
            if ("[object Window]" == c) return "object";
            if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
            if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
        } else return "null";
    else if ("function" == b && "undefined" == typeof a.call) return "object";
    return b
};
goog.isNull = function(a) {
    return null === a
};
goog.isDefAndNotNull = function(a) {
    return null != a
};
goog.isArray = function(a) {
    return "array" == goog.typeOf(a)
};
goog.isArrayLike = function(a) {
    var b = goog.typeOf(a);
    return "array" == b || "object" == b && "number" == typeof a.length
};
goog.isDateLike = function(a) {
    return goog.isObject(a) && "function" == typeof a.getFullYear
};
goog.isString = function(a) {
    return "string" == typeof a
};
goog.isBoolean = function(a) {
    return "boolean" == typeof a
};
goog.isNumber = function(a) {
    return "number" == typeof a
};
goog.isFunction = function(a) {
    return "function" == goog.typeOf(a)
};
goog.isObject = function(a) {
    var b = typeof a;
    return "object" == b && null != a || "function" == b
};
goog.getUid = function(a) {
    return a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_)
};
goog.hasUid = function(a) {
    return !!a[goog.UID_PROPERTY_]
};
goog.removeUid = function(a) {
    null !== a && "removeAttribute" in a && a.removeAttribute(goog.UID_PROPERTY_);
    try {
        delete a[goog.UID_PROPERTY_]
    } catch (b) {}
};
goog.UID_PROPERTY_ = "closure_uid_" + (1E9 * Math.random() >>> 0);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(a) {
    var b = goog.typeOf(a);
    if ("object" == b || "array" == b) {
        if (a.clone) return a.clone();
        var b = "array" == b ? [] : {},
            c;
        for (c in a) b[c] = goog.cloneObject(a[c]);
        return b
    }
    return a
};
goog.bindNative_ = function(a, b, c) {
    return a.call.apply(a.bind, arguments)
};
goog.bindJs_ = function(a, b, c) {
    if (!a) throw Error();
    if (2 < arguments.length) {
        var d = Array.prototype.slice.call(arguments, 2);
        return function() {
            var c = Array.prototype.slice.call(arguments);
            Array.prototype.unshift.apply(c, d);
            return a.apply(b, c)
        }
    }
    return function() {
        return a.apply(b, arguments)
    }
};
goog.bind = function(a, b, c) {
    Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bind = goog.bindNative_ : goog.bind = goog.bindJs_;
    return goog.bind.apply(null, arguments)
};
goog.partial = function(a, b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return function() {
        var b = c.slice();
        b.push.apply(b, arguments);
        return a.apply(this, b)
    }
};
goog.mixin = function(a, b) {
    for (var c in b) a[c] = b[c]
};
goog.now = goog.TRUSTED_SITE && Date.now || function() {
    return +new Date
};
goog.globalEval = function(a) {
    if (goog.global.execScript) goog.global.execScript(a, "JavaScript");
    else if (goog.global.eval) {
        if (null == goog.evalWorksForGlobals_)
            if (goog.global.eval("var _evalTest_ = 1;"), "undefined" != typeof goog.global._evalTest_) {
                try {
                    delete goog.global._evalTest_
                } catch (d) {}
                goog.evalWorksForGlobals_ = !0
            } else goog.evalWorksForGlobals_ = !1;
        if (goog.evalWorksForGlobals_) goog.global.eval(a);
        else {
            var b = goog.global.document,
                c = b.createElement("SCRIPT");
            c.type = "text/javascript";
            c.defer = !1;
            c.appendChild(b.createTextNode(a));
            b.body.appendChild(c);
            b.body.removeChild(c)
        }
    } else throw Error("goog.globalEval not available");
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function(a, b) {
    var c = function(a) {
            return goog.cssNameMapping_[a] || a
        },
        d = function(a) {
            a = a.split("-");
            for (var b = [], d = 0; d < a.length; d++) b.push(c(a[d]));
            return b.join("-")
        },
        d = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? c : d : function(a) {
            return a
        };
    return b ? a + "-" + d(b) : d(a)
};
goog.setCssNameMapping = function(a, b) {
    goog.cssNameMapping_ = a;
    goog.cssNameMappingStyle_ = b
};
!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
goog.getMsg = function(a, b) {
    b && (a = a.replace(/\{\$([^}]+)}/g, function(a, d) {
        return null != b && d in b ? b[d] : a
    }));
    return a
};
goog.getMsgWithFallback = function(a, b) {
    return a
};
goog.exportSymbol = function(a, b, c) {
    goog.exportPath_(a, b, c)
};
goog.exportProperty = function(a, b, c) {
    a[b] = c
};
goog.inherits = function(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.superClass_ = b.prototype;
    a.prototype = new c;
    a.prototype.constructor = a;
    a.base = function(a, c, f) {
        for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++) g[h - 2] = arguments[h];
        return b.prototype[c].apply(a, g)
    }
};
goog.base = function(a, b, c) {
    var d = arguments.callee.caller;
    if (goog.STRICT_MODE_COMPATIBLE || goog.DEBUG && !d) throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");
    if (d.superClass_) {
        for (var e = Array(arguments.length - 1), f = 1; f < arguments.length; f++) e[f - 1] = arguments[f];
        return d.superClass_.constructor.apply(a, e)
    }
    e = Array(arguments.length - 2);
    for (f = 2; f < arguments.length; f++) e[f - 2] = arguments[f];
    for (var f = !1, g = a.constructor; g; g =
        g.superClass_ && g.superClass_.constructor)
        if (g.prototype[b] === d) f = !0;
        else if (f) return g.prototype[b].apply(a, e);
    if (a[b] === d) return a.constructor.prototype[b].apply(a, e);
    throw Error("goog.base called from a method of one name to a method of a different name");
};
goog.scope = function(a) {
    a.call(goog.global)
};
COMPILED || (goog.global.COMPILED = COMPILED);
goog.defineClass = function(a, b) {
    var c = b.constructor,
        d = b.statics;
    c && c != Object.prototype.constructor || (c = function() {
        throw Error("cannot instantiate an interface (no constructor defined).");
    });
    c = goog.defineClass.createSealingConstructor_(c, a);
    a && goog.inherits(c, a);
    delete b.constructor;
    delete b.statics;
    goog.defineClass.applyProperties_(c.prototype, b);
    null != d && (d instanceof Function ? d(c) : goog.defineClass.applyProperties_(c, d));
    return c
};
goog.defineClass.SEAL_CLASS_INSTANCES = goog.DEBUG;
goog.defineClass.createSealingConstructor_ = function(a, b) {
    if (goog.defineClass.SEAL_CLASS_INSTANCES && Object.seal instanceof Function) {
        if (b && b.prototype && b.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_]) return a;
        var c = function() {
            var b = a.apply(this, arguments) || this;
            b[goog.UID_PROPERTY_] = b[goog.UID_PROPERTY_];
            this.constructor === c && Object.seal(b);
            return b
        };
        return c
    }
    return a
};
goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.defineClass.applyProperties_ = function(a, b) {
    for (var c in b) Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
    for (var d = 0; d < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length; d++) c = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[d], Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c])
};
goog.tagUnsealableClass = function(a) {
    !COMPILED && goog.defineClass.SEAL_CLASS_INSTANCES && (a.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_] = !0)
};
goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_ = "goog_defineClass_legacy_unsealable";
goog.debug = {};
goog.debug.Error = function(a) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, goog.debug.Error);
    else {
        var b = Error().stack;
        b && (this.stack = b)
    }
    a && (this.message = String(a));
    this.reportErrorToServer = !0
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.dom = {};
goog.dom.NodeType = {
    ELEMENT: 1,
    ATTRIBUTE: 2,
    TEXT: 3,
    CDATA_SECTION: 4,
    ENTITY_REFERENCE: 5,
    ENTITY: 6,
    PROCESSING_INSTRUCTION: 7,
    COMMENT: 8,
    DOCUMENT: 9,
    DOCUMENT_TYPE: 10,
    DOCUMENT_FRAGMENT: 11,
    NOTATION: 12
};
goog.string = {};
goog.string.DETECT_DOUBLE_ESCAPING = !1;
goog.string.FORCE_NON_DOM_HTML_UNESCAPING = !1;
goog.string.Unicode = {
    NBSP: "\u00a0"
};
goog.string.startsWith = function(a, b) {
    return 0 == a.lastIndexOf(b, 0)
};
goog.string.endsWith = function(a, b) {
    var c = a.length - b.length;
    return 0 <= c && a.indexOf(b, c) == c
};
goog.string.caseInsensitiveStartsWith = function(a, b) {
    return 0 == goog.string.caseInsensitiveCompare(b, a.substr(0, b.length))
};
goog.string.caseInsensitiveEndsWith = function(a, b) {
    return 0 == goog.string.caseInsensitiveCompare(b, a.substr(a.length - b.length, b.length))
};
goog.string.caseInsensitiveEquals = function(a, b) {
    return a.toLowerCase() == b.toLowerCase()
};
goog.string.subs = function(a, b) {
    for (var c = a.split("%s"), d = "", e = Array.prototype.slice.call(arguments, 1); e.length && 1 < c.length;) d += c.shift() + e.shift();
    return d + c.join("%s")
};
goog.string.collapseWhitespace = function(a) {
    return a.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
};
goog.string.isEmptyOrWhitespace = function(a) {
    return /^[\s\xa0]*$/.test(a)
};
goog.string.isEmptyString = function(a) {
    return 0 == a.length
};
goog.string.isEmpty = goog.string.isEmptyOrWhitespace;
goog.string.isEmptyOrWhitespaceSafe = function(a) {
    return goog.string.isEmptyOrWhitespace(goog.string.makeSafe(a))
};
goog.string.isEmptySafe = goog.string.isEmptyOrWhitespaceSafe;
goog.string.isBreakingWhitespace = function(a) {
    return !/[^\t\n\r ]/.test(a)
};
goog.string.isAlpha = function(a) {
    return !/[^a-zA-Z]/.test(a)
};
goog.string.isNumeric = function(a) {
    return !/[^0-9]/.test(a)
};
goog.string.isAlphaNumeric = function(a) {
    return !/[^a-zA-Z0-9]/.test(a)
};
goog.string.isSpace = function(a) {
    return " " == a
};
goog.string.isUnicodeChar = function(a) {
    return 1 == a.length && " " <= a && "~" >= a || "\u0080" <= a && "\ufffd" >= a
};
goog.string.stripNewlines = function(a) {
    return a.replace(/(\r\n|\r|\n)+/g, " ")
};
goog.string.canonicalizeNewlines = function(a) {
    return a.replace(/(\r\n|\r|\n)/g, "\n")
};
goog.string.normalizeWhitespace = function(a) {
    return a.replace(/\xa0|\s/g, " ")
};
goog.string.normalizeSpaces = function(a) {
    return a.replace(/\xa0|[ \t]+/g, " ")
};
goog.string.collapseBreakingSpaces = function(a) {
    return a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
};
goog.string.trim = goog.TRUSTED_SITE && String.prototype.trim ? function(a) {
    return a.trim()
} : function(a) {
    return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
};
goog.string.trimLeft = function(a) {
    return a.replace(/^[\s\xa0]+/, "")
};
goog.string.trimRight = function(a) {
    return a.replace(/[\s\xa0]+$/, "")
};
goog.string.caseInsensitiveCompare = function(a, b) {
    var c = String(a).toLowerCase(),
        d = String(b).toLowerCase();
    return c < d ? -1 : c == d ? 0 : 1
};
goog.string.numberAwareCompare_ = function(a, b, c) {
    if (a == b) return 0;
    if (!a) return -1;
    if (!b) return 1;
    for (var d = a.toLowerCase().match(c), e = b.toLowerCase().match(c), f = Math.min(d.length, e.length), g = 0; g < f; g++) {
        c = d[g];
        var h = e[g];
        if (c != h) return a = parseInt(c, 10), !isNaN(a) && (b = parseInt(h, 10), !isNaN(b) && a - b) ? a - b : c < h ? -1 : 1
    }
    return d.length != e.length ? d.length - e.length : a < b ? -1 : 1
};
goog.string.intAwareCompare = function(a, b) {
    return goog.string.numberAwareCompare_(a, b, /\d+|\D+/g)
};
goog.string.floatAwareCompare = function(a, b) {
    return goog.string.numberAwareCompare_(a, b, /\d+|\.\d+|\D+/g)
};
goog.string.numerateCompare = goog.string.floatAwareCompare;
goog.string.urlEncode = function(a) {
    return encodeURIComponent(String(a))
};
goog.string.urlDecode = function(a) {
    return decodeURIComponent(a.replace(/\+/g, " "))
};
goog.string.newLineToBr = function(a, b) {
    return a.replace(/(\r\n|\r|\n)/g, b ? "<br />" : "<br>")
};
goog.string.htmlEscape = function(a, b) {
    if (b) a = a.replace(goog.string.AMP_RE_, "&amp;").replace(goog.string.LT_RE_, "&lt;").replace(goog.string.GT_RE_, "&gt;").replace(goog.string.QUOT_RE_, "&quot;").replace(goog.string.SINGLE_QUOTE_RE_, "&#39;").replace(goog.string.NULL_RE_, "&#0;"), goog.string.DETECT_DOUBLE_ESCAPING && (a = a.replace(goog.string.E_RE_, "&#101;"));
    else {
        if (!goog.string.ALL_RE_.test(a)) return a; - 1 != a.indexOf("&") && (a = a.replace(goog.string.AMP_RE_, "&amp;")); - 1 != a.indexOf("<") && (a = a.replace(goog.string.LT_RE_,
            "&lt;")); - 1 != a.indexOf(">") && (a = a.replace(goog.string.GT_RE_, "&gt;")); - 1 != a.indexOf('"') && (a = a.replace(goog.string.QUOT_RE_, "&quot;")); - 1 != a.indexOf("'") && (a = a.replace(goog.string.SINGLE_QUOTE_RE_, "&#39;")); - 1 != a.indexOf("\x00") && (a = a.replace(goog.string.NULL_RE_, "&#0;"));
        goog.string.DETECT_DOUBLE_ESCAPING && -1 != a.indexOf("e") && (a = a.replace(goog.string.E_RE_, "&#101;"))
    }
    return a
};
goog.string.AMP_RE_ = /&/g;
goog.string.LT_RE_ = /</g;
goog.string.GT_RE_ = />/g;
goog.string.QUOT_RE_ = /"/g;
goog.string.SINGLE_QUOTE_RE_ = /'/g;
goog.string.NULL_RE_ = /\x00/g;
goog.string.E_RE_ = /e/g;
goog.string.ALL_RE_ = goog.string.DETECT_DOUBLE_ESCAPING ? /[\x00&<>"'e]/ : /[\x00&<>"']/;
goog.string.unescapeEntities = function(a) {
    return goog.string.contains(a, "&") ? !goog.string.FORCE_NON_DOM_HTML_UNESCAPING && "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(a) : goog.string.unescapePureXmlEntities_(a) : a
};
goog.string.unescapeEntitiesWithDocument = function(a, b) {
    return goog.string.contains(a, "&") ? goog.string.unescapeEntitiesUsingDom_(a, b) : a
};
goog.string.unescapeEntitiesUsingDom_ = function(a, b) {
    var c = {
            "&amp;": "&",
            "&lt;": "<",
            "&gt;": ">",
            "&quot;": '"'
        },
        d;
    d = b ? b.createElement("div") : goog.global.document.createElement("div");
    return a.replace(goog.string.HTML_ENTITY_PATTERN_, function(a, b) {
        var g = c[a];
        if (g) return g;
        if ("#" == b.charAt(0)) {
            var h = Number("0" + b.substr(1));
            isNaN(h) || (g = String.fromCharCode(h))
        }
        g || (d.innerHTML = a + " ", g = d.firstChild.nodeValue.slice(0, -1));
        return c[a] = g
    })
};
goog.string.unescapePureXmlEntities_ = function(a) {
    return a.replace(/&([^;]+);/g, function(a, c) {
        switch (c) {
            case "amp":
                return "&";
            case "lt":
                return "<";
            case "gt":
                return ">";
            case "quot":
                return '"';
            default:
                if ("#" == c.charAt(0)) {
                    var d = Number("0" + c.substr(1));
                    if (!isNaN(d)) return String.fromCharCode(d)
                }
                return a
        }
    })
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function(a, b) {
    return goog.string.newLineToBr(a.replace(/  /g, " &#160;"), b)
};
goog.string.preserveSpaces = function(a) {
    return a.replace(/(^|[\n ]) /g, "$1" + goog.string.Unicode.NBSP)
};
goog.string.stripQuotes = function(a, b) {
    for (var c = b.length, d = 0; d < c; d++) {
        var e = 1 == c ? b : b.charAt(d);
        if (a.charAt(0) == e && a.charAt(a.length - 1) == e) return a.substring(1, a.length - 1)
    }
    return a
};
goog.string.truncate = function(a, b, c) {
    c && (a = goog.string.unescapeEntities(a));
    a.length > b && (a = a.substring(0, b - 3) + "...");
    c && (a = goog.string.htmlEscape(a));
    return a
};
goog.string.truncateMiddle = function(a, b, c, d) {
    c && (a = goog.string.unescapeEntities(a));
    if (d && a.length > b) {
        d > b && (d = b);
        var e = a.length - d;
        a = a.substring(0, b - d) + "..." + a.substring(e)
    } else a.length > b && (d = Math.floor(b / 2), e = a.length - d, a = a.substring(0, d + b % 2) + "..." + a.substring(e));
    c && (a = goog.string.htmlEscape(a));
    return a
};
goog.string.specialEscapeChars_ = {
    "\x00": "\\0",
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "\t": "\\t",
    "\x0B": "\\x0B",
    '"': '\\"',
    "\\": "\\\\",
    "<": "<"
};
goog.string.jsEscapeCache_ = {
    "'": "\\'"
};
goog.string.quote = function(a) {
    a = String(a);
    for (var b = ['"'], c = 0; c < a.length; c++) {
        var d = a.charAt(c),
            e = d.charCodeAt(0);
        b[c + 1] = goog.string.specialEscapeChars_[d] || (31 < e && 127 > e ? d : goog.string.escapeChar(d))
    }
    b.push('"');
    return b.join("")
};
goog.string.escapeString = function(a) {
    for (var b = [], c = 0; c < a.length; c++) b[c] = goog.string.escapeChar(a.charAt(c));
    return b.join("")
};
goog.string.escapeChar = function(a) {
    if (a in goog.string.jsEscapeCache_) return goog.string.jsEscapeCache_[a];
    if (a in goog.string.specialEscapeChars_) return goog.string.jsEscapeCache_[a] = goog.string.specialEscapeChars_[a];
    var b = a,
        c = a.charCodeAt(0);
    if (31 < c && 127 > c) b = a;
    else {
        if (256 > c) {
            if (b = "\\x", 16 > c || 256 < c) b += "0"
        } else b = "\\u", 4096 > c && (b += "0");
        b += c.toString(16).toUpperCase()
    }
    return goog.string.jsEscapeCache_[a] = b
};
goog.string.contains = function(a, b) {
    return -1 != a.indexOf(b)
};
goog.string.caseInsensitiveContains = function(a, b) {
    return goog.string.contains(a.toLowerCase(), b.toLowerCase())
};
goog.string.countOf = function(a, b) {
    return a && b ? a.split(b).length - 1 : 0
};
goog.string.removeAt = function(a, b, c) {
    var d = a;
    0 <= b && b < a.length && 0 < c && (d = a.substr(0, b) + a.substr(b + c, a.length - b - c));
    return d
};
goog.string.remove = function(a, b) {
    var c = new RegExp(goog.string.regExpEscape(b), "");
    return a.replace(c, "")
};
goog.string.removeAll = function(a, b) {
    var c = new RegExp(goog.string.regExpEscape(b), "g");
    return a.replace(c, "")
};
goog.string.regExpEscape = function(a) {
    return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
};
goog.string.repeat = String.prototype.repeat ? function(a, b) {
    return a.repeat(b)
} : function(a, b) {
    return Array(b + 1).join(a)
};
goog.string.padNumber = function(a, b, c) {
    a = goog.isDef(c) ? a.toFixed(c) : String(a);
    c = a.indexOf("."); - 1 == c && (c = a.length);
    return goog.string.repeat("0", Math.max(0, b - c)) + a
};
goog.string.makeSafe = function(a) {
    return null == a ? "" : String(a)
};
goog.string.buildString = function(a) {
    return Array.prototype.join.call(arguments, "")
};
goog.string.getRandomString = function() {
    return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36)
};
goog.string.compareVersions = function(a, b) {
    for (var c = 0, d = goog.string.trim(String(a)).split("."), e = goog.string.trim(String(b)).split("."), f = Math.max(d.length, e.length), g = 0; 0 == c && g < f; g++) {
        var h = d[g] || "",
            k = e[g] || "",
            l = RegExp("(\\d*)(\\D*)", "g"),
            n = RegExp("(\\d*)(\\D*)", "g");
        do {
            var m = l.exec(h) || ["", "", ""],
                p = n.exec(k) || ["", "", ""];
            if (0 == m[0].length && 0 == p[0].length) break;
            var c = 0 == m[1].length ? 0 : parseInt(m[1], 10),
                q = 0 == p[1].length ? 0 : parseInt(p[1], 10),
                c = goog.string.compareElements_(c, q) || goog.string.compareElements_(0 ==
                    m[2].length, 0 == p[2].length) || goog.string.compareElements_(m[2], p[2])
        } while (0 == c)
    }
    return c
};
goog.string.compareElements_ = function(a, b) {
    return a < b ? -1 : a > b ? 1 : 0
};
goog.string.hashCode = function(a) {
    for (var b = 0, c = 0; c < a.length; ++c) b = 31 * b + a.charCodeAt(c) >>> 0;
    return b
};
goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
goog.string.createUniqueString = function() {
    return "goog_" + goog.string.uniqueStringCounter_++
};
goog.string.toNumber = function(a) {
    var b = Number(a);
    return 0 == b && goog.string.isEmptyOrWhitespace(a) ? NaN : b
};
goog.string.isLowerCamelCase = function(a) {
    return /^[a-z]+([A-Z][a-z]*)*$/.test(a)
};
goog.string.isUpperCamelCase = function(a) {
    return /^([A-Z][a-z]*)+$/.test(a)
};
goog.string.toCamelCase = function(a) {
    return String(a).replace(/\-([a-z])/g, function(a, c) {
        return c.toUpperCase()
    })
};
goog.string.toSelectorCase = function(a) {
    return String(a).replace(/([A-Z])/g, "-$1").toLowerCase()
};
goog.string.toTitleCase = function(a, b) {
    var c = goog.isString(b) ? goog.string.regExpEscape(b) : "\\s";
    return a.replace(new RegExp("(^" + (c ? "|[" + c + "]+" : "") + ")([a-z])", "g"), function(a, b, c) {
        return b + c.toUpperCase()
    })
};
goog.string.capitalize = function(a) {
    return String(a.charAt(0)).toUpperCase() + String(a.substr(1)).toLowerCase()
};
goog.string.parseInt = function(a) {
    isFinite(a) && (a = String(a));
    return goog.isString(a) ? /^\s*-?0x/i.test(a) ? parseInt(a, 16) : parseInt(a, 10) : NaN
};
goog.string.splitLimit = function(a, b, c) {
    a = a.split(b);
    for (var d = []; 0 < c && a.length;) d.push(a.shift()), c--;
    a.length && d.push(a.join(b));
    return d
};
goog.string.editDistance = function(a, b) {
    var c = [],
        d = [];
    if (a == b) return 0;
    if (!a.length || !b.length) return Math.max(a.length, b.length);
    for (var e = 0; e < b.length + 1; e++) c[e] = e;
    for (e = 0; e < a.length; e++) {
        d[0] = e + 1;
        for (var f = 0; f < b.length; f++) d[f + 1] = Math.min(d[f] + 1, c[f + 1] + 1, c[f] + (a[e] != b[f]));
        for (f = 0; f < c.length; f++) c[f] = d[f]
    }
    return d[b.length]
};
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function(a, b) {
    b.unshift(a);
    goog.debug.Error.call(this, goog.string.subs.apply(null, b));
    b.shift();
    this.messagePattern = a
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.DEFAULT_ERROR_HANDLER = function(a) {
    throw a;
};
goog.asserts.errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER;
goog.asserts.doAssertFailure_ = function(a, b, c, d) {
    var e = "Assertion failed";
    if (c) var e = e + (": " + c),
        f = d;
    else a && (e += ": " + a, f = b);
    a = new goog.asserts.AssertionError("" + e, f || []);
    goog.asserts.errorHandler_(a)
};
goog.asserts.setErrorHandler = function(a) {
    goog.asserts.ENABLE_ASSERTS && (goog.asserts.errorHandler_ = a)
};
goog.asserts.assert = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !a && goog.asserts.doAssertFailure_("", null, b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.fail = function(a, b) {
    goog.asserts.ENABLE_ASSERTS && goog.asserts.errorHandler_(new goog.asserts.AssertionError("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1)))
};
goog.asserts.assertNumber = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isNumber(a) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertString = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isString(a) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertFunction = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isFunction(a) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertObject = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isObject(a) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertArray = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isArray(a) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertBoolean = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(a) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertElement = function(a, b, c) {
    !goog.asserts.ENABLE_ASSERTS || goog.isObject(a) && a.nodeType == goog.dom.NodeType.ELEMENT || goog.asserts.doAssertFailure_("Expected Element but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertInstanceof = function(a, b, c, d) {
    !goog.asserts.ENABLE_ASSERTS || a instanceof b || goog.asserts.doAssertFailure_("Expected instanceof %s but got %s.", [goog.asserts.getType_(b), goog.asserts.getType_(a)], c, Array.prototype.slice.call(arguments, 3));
    return a
};
goog.asserts.assertObjectPrototypeIsIntact = function() {
    for (var a in Object.prototype) goog.asserts.fail(a + " should not be enumerable in Object.prototype.")
};
goog.asserts.getType_ = function(a) {
    return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a
};
goog.array = {};
goog.NATIVE_ARRAY_PROTOTYPES = goog.TRUSTED_SITE;
goog.array.ASSUME_NATIVE_FUNCTIONS = !1;
goog.array.peek = function(a) {
    return a[a.length - 1]
};
goog.array.last = goog.array.peek;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.indexOf) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.indexOf.call(a, b, c)
} : function(a, b, c) {
    c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
    if (goog.isString(a)) return goog.isString(b) && 1 == b.length ? a.indexOf(b, c) : -1;
    for (; c < a.length; c++)
        if (c in a && a[c] === b) return c;
    return -1
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.lastIndexOf) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.lastIndexOf.call(a, b, null == c ? a.length - 1 : c)
} : function(a, b, c) {
    c = null == c ? a.length - 1 : c;
    0 > c && (c = Math.max(0, a.length + c));
    if (goog.isString(a)) return goog.isString(b) && 1 == b.length ? a.lastIndexOf(b, c) : -1;
    for (; 0 <= c; c--)
        if (c in a && a[c] === b) return c;
    return -1
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.forEach) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    Array.prototype.forEach.call(a, b, c)
} : function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a)
};
goog.array.forEachRight = function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1; 0 <= d; --d) d in e && b.call(c, e[d], d, a)
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.filter) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.filter.call(a, b, c)
} : function(a, b, c) {
    for (var d = a.length, e = [], f = 0, g = goog.isString(a) ? a.split("") : a, h = 0; h < d; h++)
        if (h in g) {
            var k = g[h];
            b.call(c, k, h, a) && (e[f++] = k)
        }
    return e
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.map) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.map.call(a, b, c)
} : function(a, b, c) {
    for (var d = a.length, e = Array(d), f = goog.isString(a) ? a.split("") : a, g = 0; g < d; g++) g in f && (e[g] = b.call(c, f[g], g, a));
    return e
};
goog.array.reduce = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduce) ? function(a, b, c, d) {
    goog.asserts.assert(null != a.length);
    d && (b = goog.bind(b, d));
    return Array.prototype.reduce.call(a, b, c)
} : function(a, b, c, d) {
    var e = c;
    goog.array.forEach(a, function(c, g) {
        e = b.call(d, e, c, g, a)
    });
    return e
};
goog.array.reduceRight = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduceRight) ? function(a, b, c, d) {
    goog.asserts.assert(null != a.length);
    goog.asserts.assert(null != b);
    d && (b = goog.bind(b, d));
    return Array.prototype.reduceRight.call(a, b, c)
} : function(a, b, c, d) {
    var e = c;
    goog.array.forEachRight(a, function(c, g) {
        e = b.call(d, e, c, g, a)
    });
    return e
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.some) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.some.call(a, b, c)
} : function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++)
        if (f in e && b.call(c, e[f], f, a)) return !0;
    return !1
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.every) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.every.call(a, b, c)
} : function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++)
        if (f in e && !b.call(c, e[f], f, a)) return !1;
    return !0
};
goog.array.count = function(a, b, c) {
    var d = 0;
    goog.array.forEach(a, function(a, f, g) {
        b.call(c, a, f, g) && ++d
    }, c);
    return d
};
goog.array.find = function(a, b, c) {
    b = goog.array.findIndex(a, b, c);
    return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b]
};
goog.array.findIndex = function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++)
        if (f in e && b.call(c, e[f], f, a)) return f;
    return -1
};
goog.array.findRight = function(a, b, c) {
    b = goog.array.findIndexRight(a, b, c);
    return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b]
};
goog.array.findIndexRight = function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1; 0 <= d; d--)
        if (d in e && b.call(c, e[d], d, a)) return d;
    return -1
};
goog.array.contains = function(a, b) {
    return 0 <= goog.array.indexOf(a, b)
};
goog.array.isEmpty = function(a) {
    return 0 == a.length
};
goog.array.clear = function(a) {
    if (!goog.isArray(a))
        for (var b = a.length - 1; 0 <= b; b--) delete a[b];
    a.length = 0
};
goog.array.insert = function(a, b) {
    goog.array.contains(a, b) || a.push(b)
};
goog.array.insertAt = function(a, b, c) {
    goog.array.splice(a, c, 0, b)
};
goog.array.insertArrayAt = function(a, b, c) {
    goog.partial(goog.array.splice, a, c, 0).apply(null, b)
};
goog.array.insertBefore = function(a, b, c) {
    var d;
    2 == arguments.length || 0 > (d = goog.array.indexOf(a, c)) ? a.push(b) : goog.array.insertAt(a, b, d)
};
goog.array.remove = function(a, b) {
    var c = goog.array.indexOf(a, b),
        d;
    (d = 0 <= c) && goog.array.removeAt(a, c);
    return d
};
goog.array.removeAt = function(a, b) {
    goog.asserts.assert(null != a.length);
    return 1 == Array.prototype.splice.call(a, b, 1).length
};
goog.array.removeIf = function(a, b, c) {
    b = goog.array.findIndex(a, b, c);
    return 0 <= b ? (goog.array.removeAt(a, b), !0) : !1
};
goog.array.removeAllIf = function(a, b, c) {
    var d = 0;
    goog.array.forEachRight(a, function(e, f) {
        b.call(c, e, f, a) && goog.array.removeAt(a, f) && d++
    });
    return d
};
goog.array.concat = function(a) {
    return Array.prototype.concat.apply(Array.prototype, arguments)
};
goog.array.join = function(a) {
    return Array.prototype.concat.apply(Array.prototype, arguments)
};
goog.array.toArray = function(a) {
    var b = a.length;
    if (0 < b) {
        for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
        return c
    }
    return []
};
goog.array.clone = goog.array.toArray;
goog.array.extend = function(a, b) {
    for (var c = 1; c < arguments.length; c++) {
        var d = arguments[c];
        if (goog.isArrayLike(d)) {
            var e = a.length || 0,
                f = d.length || 0;
            a.length = e + f;
            for (var g = 0; g < f; g++) a[e + g] = d[g]
        } else a.push(d)
    }
};
goog.array.splice = function(a, b, c, d) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.splice.apply(a, goog.array.slice(arguments, 1))
};
goog.array.slice = function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a, b, c)
};
goog.array.removeDuplicates = function(a, b, c) {
    b = b || a;
    var d = function(a) {
        return goog.isObject(a) ? "o" + goog.getUid(a) : (typeof a).charAt(0) + a
    };
    c = c || d;
    for (var d = {}, e = 0, f = 0; f < a.length;) {
        var g = a[f++],
            h = c(g);
        Object.prototype.hasOwnProperty.call(d, h) || (d[h] = !0, b[e++] = g)
    }
    b.length = e
};
goog.array.binarySearch = function(a, b, c) {
    return goog.array.binarySearch_(a, c || goog.array.defaultCompare, !1, b)
};
goog.array.binarySelect = function(a, b, c) {
    return goog.array.binarySearch_(a, b, !0, void 0, c)
};
goog.array.binarySearch_ = function(a, b, c, d, e) {
    for (var f = 0, g = a.length, h; f < g;) {
        var k = f + g >> 1,
            l;
        l = c ? b.call(e, a[k], k, a) : b(d, a[k]);
        0 < l ? f = k + 1 : (g = k, h = !l)
    }
    return h ? f : ~f
};
goog.array.sort = function(a, b) {
    a.sort(b || goog.array.defaultCompare)
};
goog.array.stableSort = function(a, b) {
    for (var c = 0; c < a.length; c++) a[c] = {
        index: c,
        value: a[c]
    };
    var d = b || goog.array.defaultCompare;
    goog.array.sort(a, function(a, b) {
        return d(a.value, b.value) || a.index - b.index
    });
    for (c = 0; c < a.length; c++) a[c] = a[c].value
};
goog.array.sortByKey = function(a, b, c) {
    var d = c || goog.array.defaultCompare;
    goog.array.sort(a, function(a, c) {
        return d(b(a), b(c))
    })
};
goog.array.sortObjectsByKey = function(a, b, c) {
    goog.array.sortByKey(a, function(a) {
        return a[b]
    }, c)
};
goog.array.isSorted = function(a, b, c) {
    b = b || goog.array.defaultCompare;
    for (var d = 1; d < a.length; d++) {
        var e = b(a[d - 1], a[d]);
        if (0 < e || 0 == e && c) return !1
    }
    return !0
};
goog.array.equals = function(a, b, c) {
    if (!goog.isArrayLike(a) || !goog.isArrayLike(b) || a.length != b.length) return !1;
    var d = a.length;
    c = c || goog.array.defaultCompareEquality;
    for (var e = 0; e < d; e++)
        if (!c(a[e], b[e])) return !1;
    return !0
};
goog.array.compare3 = function(a, b, c) {
    c = c || goog.array.defaultCompare;
    for (var d = Math.min(a.length, b.length), e = 0; e < d; e++) {
        var f = c(a[e], b[e]);
        if (0 != f) return f
    }
    return goog.array.defaultCompare(a.length, b.length)
};
goog.array.defaultCompare = function(a, b) {
    return a > b ? 1 : a < b ? -1 : 0
};
goog.array.inverseDefaultCompare = function(a, b) {
    return -goog.array.defaultCompare(a, b)
};
goog.array.defaultCompareEquality = function(a, b) {
    return a === b
};
goog.array.binaryInsert = function(a, b, c) {
    c = goog.array.binarySearch(a, b, c);
    return 0 > c ? (goog.array.insertAt(a, b, -(c + 1)), !0) : !1
};
goog.array.binaryRemove = function(a, b, c) {
    b = goog.array.binarySearch(a, b, c);
    return 0 <= b ? goog.array.removeAt(a, b) : !1
};
goog.array.bucket = function(a, b, c) {
    for (var d = {}, e = 0; e < a.length; e++) {
        var f = a[e],
            g = b.call(c, f, e, a);
        goog.isDef(g) && (d[g] || (d[g] = [])).push(f)
    }
    return d
};
goog.array.toObject = function(a, b, c) {
    var d = {};
    goog.array.forEach(a, function(e, f) {
        d[b.call(c, e, f, a)] = e
    });
    return d
};
goog.array.range = function(a, b, c) {
    var d = [],
        e = 0,
        f = a;
    c = c || 1;
    void 0 !== b && (e = a, f = b);
    if (0 > c * (f - e)) return [];
    if (0 < c)
        for (a = e; a < f; a += c) d.push(a);
    else
        for (a = e; a > f; a += c) d.push(a);
    return d
};
goog.array.repeat = function(a, b) {
    for (var c = [], d = 0; d < b; d++) c[d] = a;
    return c
};
goog.array.flatten = function(a) {
    for (var b = [], c = 0; c < arguments.length; c++) {
        var d = arguments[c];
        if (goog.isArray(d))
            for (var e = 0; e < d.length; e += 8192)
                for (var f = goog.array.slice(d, e, e + 8192), f = goog.array.flatten.apply(null, f), g = 0; g < f.length; g++) b.push(f[g]);
        else b.push(d)
    }
    return b
};
goog.array.rotate = function(a, b) {
    goog.asserts.assert(null != a.length);
    a.length && (b %= a.length, 0 < b ? Array.prototype.unshift.apply(a, a.splice(-b, b)) : 0 > b && Array.prototype.push.apply(a, a.splice(0, -b)));
    return a
};
goog.array.moveItem = function(a, b, c) {
    goog.asserts.assert(0 <= b && b < a.length);
    goog.asserts.assert(0 <= c && c < a.length);
    b = Array.prototype.splice.call(a, b, 1);
    Array.prototype.splice.call(a, c, 0, b[0])
};
goog.array.zip = function(a) {
    if (!arguments.length) return [];
    for (var b = [], c = arguments[0].length, d = 1; d < arguments.length; d++) arguments[d].length < c && (c = arguments[d].length);
    for (d = 0; d < c; d++) {
        for (var e = [], f = 0; f < arguments.length; f++) e.push(arguments[f][d]);
        b.push(e)
    }
    return b
};
goog.array.shuffle = function(a, b) {
    for (var c = b || Math.random, d = a.length - 1; 0 < d; d--) {
        var e = Math.floor(c() * (d + 1)),
            f = a[d];
        a[d] = a[e];
        a[e] = f
    }
};
goog.array.copyByIndex = function(a, b) {
    var c = [];
    goog.array.forEach(b, function(b) {
        c.push(a[b])
    });
    return c
};
goog.labs = {};
goog.labs.userAgent = {};
goog.labs.userAgent.util = {};
goog.labs.userAgent.util.getNativeUserAgentString_ = function() {
    var a = goog.labs.userAgent.util.getNavigator_();
    return a && (a = a.userAgent) ? a : ""
};
goog.labs.userAgent.util.getNavigator_ = function() {
    return goog.global.navigator
};
goog.labs.userAgent.util.userAgent_ = goog.labs.userAgent.util.getNativeUserAgentString_();
goog.labs.userAgent.util.setUserAgent = function(a) {
    goog.labs.userAgent.util.userAgent_ = a || goog.labs.userAgent.util.getNativeUserAgentString_()
};
goog.labs.userAgent.util.getUserAgent = function() {
    return goog.labs.userAgent.util.userAgent_
};
goog.labs.userAgent.util.matchUserAgent = function(a) {
    var b = goog.labs.userAgent.util.getUserAgent();
    return goog.string.contains(b, a)
};
goog.labs.userAgent.util.matchUserAgentIgnoreCase = function(a) {
    var b = goog.labs.userAgent.util.getUserAgent();
    return goog.string.caseInsensitiveContains(b, a)
};
goog.labs.userAgent.util.extractVersionTuples = function(a) {
    for (var b = RegExp("(\\w[\\w ]+)/([^\\s]+)\\s*(?:\\((.*?)\\))?", "g"), c = [], d; d = b.exec(a);) c.push([d[1], d[2], d[3] || void 0]);
    return c
};
goog.labs.userAgent.engine = {};
goog.labs.userAgent.engine.isPresto = function() {
    return goog.labs.userAgent.util.matchUserAgent("Presto")
};
goog.labs.userAgent.engine.isTrident = function() {
    return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE")
};
goog.labs.userAgent.engine.isEdge = function() {
    return goog.labs.userAgent.util.matchUserAgent("Edge")
};
goog.labs.userAgent.engine.isWebKit = function() {
    return goog.labs.userAgent.util.matchUserAgentIgnoreCase("WebKit") && !goog.labs.userAgent.engine.isEdge()
};
goog.labs.userAgent.engine.isGecko = function() {
    return goog.labs.userAgent.util.matchUserAgent("Gecko") && !goog.labs.userAgent.engine.isWebKit() && !goog.labs.userAgent.engine.isTrident() && !goog.labs.userAgent.engine.isEdge()
};
goog.labs.userAgent.engine.getVersion = function() {
    var a = goog.labs.userAgent.util.getUserAgent();
    if (a) {
        var a = goog.labs.userAgent.util.extractVersionTuples(a),
            b = goog.labs.userAgent.engine.getEngineTuple_(a);
        if (b) return "Gecko" == b[0] ? goog.labs.userAgent.engine.getVersionForKey_(a, "Firefox") : b[1];
        var a = a[0],
            c;
        if (a && (c = a[2]) && (c = /Trident\/([^\s;]+)/.exec(c))) return c[1]
    }
    return ""
};
goog.labs.userAgent.engine.getEngineTuple_ = function(a) {
    if (!goog.labs.userAgent.engine.isEdge()) return a[1];
    for (var b = 0; b < a.length; b++) {
        var c = a[b];
        if ("Edge" == c[0]) return c
    }
};
goog.labs.userAgent.engine.isVersionOrHigher = function(a) {
    return 0 <= goog.string.compareVersions(goog.labs.userAgent.engine.getVersion(), a)
};
goog.labs.userAgent.engine.getVersionForKey_ = function(a, b) {
    var c = goog.array.find(a, function(a) {
        return b == a[0]
    });
    return c && c[1] || ""
};
goog.labs.userAgent.platform = {};
goog.labs.userAgent.platform.isAndroid = function() {
    return goog.labs.userAgent.util.matchUserAgent("Android")
};
goog.labs.userAgent.platform.isIpod = function() {
    return goog.labs.userAgent.util.matchUserAgent("iPod")
};
goog.labs.userAgent.platform.isIphone = function() {
    return goog.labs.userAgent.util.matchUserAgent("iPhone") && !goog.labs.userAgent.util.matchUserAgent("iPod") && !goog.labs.userAgent.util.matchUserAgent("iPad")
};
goog.labs.userAgent.platform.isIpad = function() {
    return goog.labs.userAgent.util.matchUserAgent("iPad")
};
goog.labs.userAgent.platform.isIos = function() {
    return goog.labs.userAgent.platform.isIphone() || goog.labs.userAgent.platform.isIpad() || goog.labs.userAgent.platform.isIpod()
};
goog.labs.userAgent.platform.isMacintosh = function() {
    return goog.labs.userAgent.util.matchUserAgent("Macintosh")
};
goog.labs.userAgent.platform.isLinux = function() {
    return goog.labs.userAgent.util.matchUserAgent("Linux")
};
goog.labs.userAgent.platform.isWindows = function() {
    return goog.labs.userAgent.util.matchUserAgent("Windows")
};
goog.labs.userAgent.platform.isChromeOS = function() {
    return goog.labs.userAgent.util.matchUserAgent("CrOS")
};
goog.labs.userAgent.platform.getVersion = function() {
    var a = goog.labs.userAgent.util.getUserAgent(),
        b = "";
    goog.labs.userAgent.platform.isWindows() ? (b = /Windows (?:NT|Phone) ([0-9.]+)/, b = (a = b.exec(a)) ? a[1] : "0.0") : goog.labs.userAgent.platform.isIos() ? (b = /(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/, b = (a = b.exec(a)) && a[1].replace(/_/g, ".")) : goog.labs.userAgent.platform.isMacintosh() ? (b = /Mac OS X ([0-9_.]+)/, b = (a = b.exec(a)) ? a[1].replace(/_/g, ".") : "10") : goog.labs.userAgent.platform.isAndroid() ? (b = /Android\s+([^\);]+)(\)|;)/,
        b = (a = b.exec(a)) && a[1]) : goog.labs.userAgent.platform.isChromeOS() && (b = /(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/, b = (a = b.exec(a)) && a[1]);
    return b || ""
};
goog.labs.userAgent.platform.isVersionOrHigher = function(a) {
    return 0 <= goog.string.compareVersions(goog.labs.userAgent.platform.getVersion(), a)
};
goog.object = {};
goog.object.forEach = function(a, b, c) {
    for (var d in a) b.call(c, a[d], d, a)
};
goog.object.filter = function(a, b, c) {
    var d = {},
        e;
    for (e in a) b.call(c, a[e], e, a) && (d[e] = a[e]);
    return d
};
goog.object.map = function(a, b, c) {
    var d = {},
        e;
    for (e in a) d[e] = b.call(c, a[e], e, a);
    return d
};
goog.object.some = function(a, b, c) {
    for (var d in a)
        if (b.call(c, a[d], d, a)) return !0;
    return !1
};
goog.object.every = function(a, b, c) {
    for (var d in a)
        if (!b.call(c, a[d], d, a)) return !1;
    return !0
};
goog.object.getCount = function(a) {
    var b = 0,
        c;
    for (c in a) b++;
    return b
};
goog.object.getAnyKey = function(a) {
    for (var b in a) return b
};
goog.object.getAnyValue = function(a) {
    for (var b in a) return a[b]
};
goog.object.contains = function(a, b) {
    return goog.object.containsValue(a, b)
};
goog.object.getValues = function(a) {
    var b = [],
        c = 0,
        d;
    for (d in a) b[c++] = a[d];
    return b
};
goog.object.getKeys = function(a) {
    var b = [],
        c = 0,
        d;
    for (d in a) b[c++] = d;
    return b
};
goog.object.getValueByKeys = function(a, b) {
    for (var c = goog.isArrayLike(b), d = c ? b : arguments, c = c ? 0 : 1; c < d.length && (a = a[d[c]], goog.isDef(a)); c++);
    return a
};
goog.object.containsKey = function(a, b) {
    return null !== a && b in a
};
goog.object.containsValue = function(a, b) {
    for (var c in a)
        if (a[c] == b) return !0;
    return !1
};
goog.object.findKey = function(a, b, c) {
    for (var d in a)
        if (b.call(c, a[d], d, a)) return d
};
goog.object.findValue = function(a, b, c) {
    return (b = goog.object.findKey(a, b, c)) && a[b]
};
goog.object.isEmpty = function(a) {
    for (var b in a) return !1;
    return !0
};
goog.object.clear = function(a) {
    for (var b in a) delete a[b]
};
goog.object.remove = function(a, b) {
    var c;
    (c = b in a) && delete a[b];
    return c
};
goog.object.add = function(a, b, c) {
    if (null !== a && b in a) throw Error('The object already contains the key "' + b + '"');
    goog.object.set(a, b, c)
};
goog.object.get = function(a, b, c) {
    return null !== a && b in a ? a[b] : c
};
goog.object.set = function(a, b, c) {
    a[b] = c
};
goog.object.setIfUndefined = function(a, b, c) {
    return b in a ? a[b] : a[b] = c
};
goog.object.setWithReturnValueIfNotSet = function(a, b, c) {
    if (b in a) return a[b];
    c = c();
    return a[b] = c
};
goog.object.equals = function(a, b) {
    for (var c in a)
        if (!(c in b) || a[c] !== b[c]) return !1;
    for (c in b)
        if (!(c in a)) return !1;
    return !0
};
goog.object.clone = function(a) {
    var b = {},
        c;
    for (c in a) b[c] = a[c];
    return b
};
goog.object.unsafeClone = function(a) {
    var b = goog.typeOf(a);
    if ("object" == b || "array" == b) {
        if (goog.isFunction(a.clone)) return a.clone();
        var b = "array" == b ? [] : {},
            c;
        for (c in a) b[c] = goog.object.unsafeClone(a[c]);
        return b
    }
    return a
};
goog.object.transpose = function(a) {
    var b = {},
        c;
    for (c in a) b[a[c]] = c;
    return b
};
goog.object.PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.object.extend = function(a, b) {
    for (var c, d, e = 1; e < arguments.length; e++) {
        d = arguments[e];
        for (c in d) a[c] = d[c];
        for (var f = 0; f < goog.object.PROTOTYPE_FIELDS_.length; f++) c = goog.object.PROTOTYPE_FIELDS_[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
};
goog.object.create = function(a) {
    var b = arguments.length;
    if (1 == b && goog.isArray(arguments[0])) return goog.object.create.apply(null, arguments[0]);
    if (b % 2) throw Error("Uneven number of arguments");
    for (var c = {}, d = 0; d < b; d += 2) c[arguments[d]] = arguments[d + 1];
    return c
};
goog.object.createSet = function(a) {
    var b = arguments.length;
    if (1 == b && goog.isArray(arguments[0])) return goog.object.createSet.apply(null, arguments[0]);
    for (var c = {}, d = 0; d < b; d++) c[arguments[d]] = !0;
    return c
};
goog.object.createImmutableView = function(a) {
    var b = a;
    Object.isFrozen && !Object.isFrozen(a) && (b = Object.create(a), Object.freeze(b));
    return b
};
goog.object.isImmutableView = function(a) {
    return !!Object.isFrozen && Object.isFrozen(a)
};
goog.labs.userAgent.browser = {};
goog.labs.userAgent.browser.matchOpera_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Opera") || goog.labs.userAgent.util.matchUserAgent("OPR")
};
goog.labs.userAgent.browser.matchIE_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE")
};
goog.labs.userAgent.browser.matchEdge_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Edge")
};
goog.labs.userAgent.browser.matchFirefox_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Firefox")
};
goog.labs.userAgent.browser.matchSafari_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Safari") && !(goog.labs.userAgent.browser.matchChrome_() || goog.labs.userAgent.browser.matchCoast_() || goog.labs.userAgent.browser.matchOpera_() || goog.labs.userAgent.browser.matchEdge_() || goog.labs.userAgent.browser.isSilk() || goog.labs.userAgent.util.matchUserAgent("Android"))
};
goog.labs.userAgent.browser.matchCoast_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Coast")
};
goog.labs.userAgent.browser.matchIosWebview_ = function() {
    return (goog.labs.userAgent.util.matchUserAgent("iPad") || goog.labs.userAgent.util.matchUserAgent("iPhone")) && !goog.labs.userAgent.browser.matchSafari_() && !goog.labs.userAgent.browser.matchChrome_() && !goog.labs.userAgent.browser.matchCoast_() && goog.labs.userAgent.util.matchUserAgent("AppleWebKit")
};
goog.labs.userAgent.browser.matchChrome_ = function() {
    return (goog.labs.userAgent.util.matchUserAgent("Chrome") || goog.labs.userAgent.util.matchUserAgent("CriOS")) && !goog.labs.userAgent.browser.matchOpera_() && !goog.labs.userAgent.browser.matchEdge_()
};
goog.labs.userAgent.browser.matchAndroidBrowser_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Android") && !(goog.labs.userAgent.browser.isChrome() || goog.labs.userAgent.browser.isFirefox() || goog.labs.userAgent.browser.isOpera() || goog.labs.userAgent.browser.isSilk())
};
goog.labs.userAgent.browser.isOpera = goog.labs.userAgent.browser.matchOpera_;
goog.labs.userAgent.browser.isIE = goog.labs.userAgent.browser.matchIE_;
goog.labs.userAgent.browser.isEdge = goog.labs.userAgent.browser.matchEdge_;
goog.labs.userAgent.browser.isFirefox = goog.labs.userAgent.browser.matchFirefox_;
goog.labs.userAgent.browser.isSafari = goog.labs.userAgent.browser.matchSafari_;
goog.labs.userAgent.browser.isCoast = goog.labs.userAgent.browser.matchCoast_;
goog.labs.userAgent.browser.isIosWebview = goog.labs.userAgent.browser.matchIosWebview_;
goog.labs.userAgent.browser.isChrome = goog.labs.userAgent.browser.matchChrome_;
goog.labs.userAgent.browser.isAndroidBrowser = goog.labs.userAgent.browser.matchAndroidBrowser_;
goog.labs.userAgent.browser.isSilk = function() {
    return goog.labs.userAgent.util.matchUserAgent("Silk")
};
goog.labs.userAgent.browser.getVersion = function() {
    function a(a) {
        a = goog.array.find(a, d);
        return c[a] || ""
    }
    var b = goog.labs.userAgent.util.getUserAgent();
    if (goog.labs.userAgent.browser.isIE()) return goog.labs.userAgent.browser.getIEVersion_(b);
    var b = goog.labs.userAgent.util.extractVersionTuples(b),
        c = {};
    goog.array.forEach(b, function(a) {
        c[a[0]] = a[1]
    });
    var d = goog.partial(goog.object.containsKey, c);
    return goog.labs.userAgent.browser.isOpera() ? a(["Version", "Opera", "OPR"]) : goog.labs.userAgent.browser.isEdge() ?
        a(["Edge"]) : goog.labs.userAgent.browser.isChrome() ? a(["Chrome", "CriOS"]) : (b = b[2]) && b[1] || ""
};
goog.labs.userAgent.browser.isVersionOrHigher = function(a) {
    return 0 <= goog.string.compareVersions(goog.labs.userAgent.browser.getVersion(), a)
};
goog.labs.userAgent.browser.getIEVersion_ = function(a) {
    var b = /rv: *([\d\.]*)/.exec(a);
    if (b && b[1]) return b[1];
    var b = "",
        c = /MSIE +([\d\.]+)/.exec(a);
    if (c && c[1])
        if (a = /Trident\/(\d.\d)/.exec(a), "7.0" == c[1])
            if (a && a[1]) switch (a[1]) {
                case "4.0":
                    b = "8.0";
                    break;
                case "5.0":
                    b = "9.0";
                    break;
                case "6.0":
                    b = "10.0";
                    break;
                case "7.0":
                    b = "11.0"
            } else b = "7.0";
            else b = c[1];
    return b
};
goog.userAgent = {};
goog.userAgent.ASSUME_IE = !1;
goog.userAgent.ASSUME_EDGE = !1;
goog.userAgent.ASSUME_GECKO = !1;
goog.userAgent.ASSUME_WEBKIT = !1;
goog.userAgent.ASSUME_MOBILE_WEBKIT = !1;
goog.userAgent.ASSUME_OPERA = !1;
goog.userAgent.ASSUME_ANY_VERSION = !1;
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_EDGE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
goog.userAgent.getUserAgentString = function() {
    return goog.labs.userAgent.util.getUserAgent()
};
goog.userAgent.getNavigator = function() {
    return goog.global.navigator || null
};
goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.labs.userAgent.browser.isOpera();
goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.labs.userAgent.browser.isIE();
goog.userAgent.EDGE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_EDGE : goog.labs.userAgent.engine.isEdge();
goog.userAgent.EDGE_OR_IE = goog.userAgent.EDGE || goog.userAgent.IE;
goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.labs.userAgent.engine.isGecko();
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.labs.userAgent.engine.isWebKit();
goog.userAgent.isMobile_ = function() {
    return goog.userAgent.WEBKIT && goog.labs.userAgent.util.matchUserAgent("Mobile")
};
goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.isMobile_();
goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
goog.userAgent.determinePlatform_ = function() {
    var a = goog.userAgent.getNavigator();
    return a && a.platform || ""
};
goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
goog.userAgent.ASSUME_MAC = !1;
goog.userAgent.ASSUME_WINDOWS = !1;
goog.userAgent.ASSUME_LINUX = !1;
goog.userAgent.ASSUME_X11 = !1;
goog.userAgent.ASSUME_ANDROID = !1;
goog.userAgent.ASSUME_IPHONE = !1;
goog.userAgent.ASSUME_IPAD = !1;
goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11 || goog.userAgent.ASSUME_ANDROID || goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD;
goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.labs.userAgent.platform.isMacintosh();
goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.labs.userAgent.platform.isWindows();
goog.userAgent.isLegacyLinux_ = function() {
    return goog.labs.userAgent.platform.isLinux() || goog.labs.userAgent.platform.isChromeOS()
};
goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.isLegacyLinux_();
goog.userAgent.isX11_ = function() {
    var a = goog.userAgent.getNavigator();
    return !!a && goog.string.contains(a.appVersion || "", "X11")
};
goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.isX11_();
goog.userAgent.ANDROID = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_ANDROID : goog.labs.userAgent.platform.isAndroid();
goog.userAgent.IPHONE = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE : goog.labs.userAgent.platform.isIphone();
goog.userAgent.IPAD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPAD : goog.labs.userAgent.platform.isIpad();
goog.userAgent.operaVersion_ = function() {
    var a = goog.global.opera.version;
    try {
        return a()
    } catch (b) {
        return a
    }
};
goog.userAgent.determineVersion_ = function() {
    if (goog.userAgent.OPERA && goog.global.opera) return goog.userAgent.operaVersion_();
    var a = "",
        b = goog.userAgent.getVersionRegexResult_();
    b && (a = b ? b[1] : "");
    return goog.userAgent.IE && (b = goog.userAgent.getDocumentMode_(), b > parseFloat(a)) ? String(b) : a
};
goog.userAgent.getVersionRegexResult_ = function() {
    var a = goog.userAgent.getUserAgentString();
    if (goog.userAgent.GECKO) return /rv\:([^\);]+)(\)|;)/.exec(a);
    if (goog.userAgent.EDGE) return /Edge\/([\d\.]+)/.exec(a);
    if (goog.userAgent.IE) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
    if (goog.userAgent.WEBKIT) return /WebKit\/(\S+)/.exec(a)
};
goog.userAgent.getDocumentMode_ = function() {
    var a = goog.global.document;
    return a ? a.documentMode : void 0
};
goog.userAgent.VERSION = goog.userAgent.determineVersion_();
goog.userAgent.compare = function(a, b) {
    return goog.string.compareVersions(a, b)
};
goog.userAgent.isVersionOrHigherCache_ = {};
goog.userAgent.isVersionOrHigher = function(a) {
    return goog.userAgent.ASSUME_ANY_VERSION || goog.userAgent.isVersionOrHigherCache_[a] || (goog.userAgent.isVersionOrHigherCache_[a] = 0 <= goog.string.compareVersions(goog.userAgent.VERSION, a))
};
goog.userAgent.isVersion = goog.userAgent.isVersionOrHigher;
goog.userAgent.isDocumentModeOrHigher = function(a) {
    return goog.userAgent.DOCUMENT_MODE >= a
};
goog.userAgent.isDocumentMode = goog.userAgent.isDocumentModeOrHigher;
goog.userAgent.DOCUMENT_MODE = function() {
    var a = goog.global.document,
        b = goog.userAgent.getDocumentMode_();
    return a && goog.userAgent.IE ? b || ("CSS1Compat" == a.compatMode ? parseInt(goog.userAgent.VERSION, 10) : 5) : void 0
}();
goog.events = {};
goog.events.BrowserFeature = {
    HAS_W3C_BUTTON: !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9),
    HAS_W3C_EVENT_SUPPORT: !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9),
    SET_KEY_CODE_TO_PREVENT_DEFAULT: goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"),
    HAS_NAVIGATOR_ONLINE_PROPERTY: !goog.userAgent.WEBKIT || goog.userAgent.isVersionOrHigher("528"),
    HAS_HTML5_NETWORK_EVENT_SUPPORT: goog.userAgent.GECKO && goog.userAgent.isVersionOrHigher("1.9b") || goog.userAgent.IE && goog.userAgent.isVersionOrHigher("8") ||
        goog.userAgent.OPERA && goog.userAgent.isVersionOrHigher("9.5") || goog.userAgent.WEBKIT && goog.userAgent.isVersionOrHigher("528"),
    HTML5_NETWORK_EVENTS_FIRE_ON_BODY: goog.userAgent.GECKO && !goog.userAgent.isVersionOrHigher("8") || goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"),
    TOUCH_ENABLED: "ontouchstart" in goog.global || !!(goog.global.document && document.documentElement && "ontouchstart" in document.documentElement) || !(!goog.global.navigator || !goog.global.navigator.msMaxTouchPoints)
};
goog.events.EventId = function(a) {
    this.id = a
};
goog.events.EventId.prototype.toString = function() {
    return this.id
};
goog.events.Listenable = function() {};
goog.events.Listenable.IMPLEMENTED_BY_PROP = "closure_listenable_" + (1E6 * Math.random() | 0);
goog.events.Listenable.addImplementation = function(a) {
    a.prototype[goog.events.Listenable.IMPLEMENTED_BY_PROP] = !0
};
goog.events.Listenable.isImplementedBy = function(a) {
    return !(!a || !a[goog.events.Listenable.IMPLEMENTED_BY_PROP])
};
goog.events.ListenableKey = function() {};
goog.events.ListenableKey.counter_ = 0;
goog.events.ListenableKey.reserveKey = function() {
    return ++goog.events.ListenableKey.counter_
};
goog.events.getVendorPrefixedName_ = function(a) {
    return goog.userAgent.WEBKIT ? "webkit" + a : goog.userAgent.OPERA ? "o" + a.toLowerCase() : a.toLowerCase()
};
goog.events.EventType = {
    CLICK: "click",
    RIGHTCLICK: "rightclick",
    DBLCLICK: "dblclick",
    MOUSEDOWN: "mousedown",
    MOUSEUP: "mouseup",
    MOUSEOVER: "mouseover",
    MOUSEOUT: "mouseout",
    MOUSEMOVE: "mousemove",
    MOUSEENTER: "mouseenter",
    MOUSELEAVE: "mouseleave",
    SELECTSTART: "selectstart",
    WHEEL: "wheel",
    KEYPRESS: "keypress",
    KEYDOWN: "keydown",
    KEYUP: "keyup",
    BLUR: "blur",
    FOCUS: "focus",
    DEACTIVATE: "deactivate",
    FOCUSIN: goog.userAgent.IE ? "focusin" : "DOMFocusIn",
    FOCUSOUT: goog.userAgent.IE ? "focusout" : "DOMFocusOut",
    CHANGE: "change",
    RESET: "reset",
    SELECT: "select",
    SUBMIT: "submit",
    INPUT: "input",
    PROPERTYCHANGE: "propertychange",
    DRAGSTART: "dragstart",
    DRAG: "drag",
    DRAGENTER: "dragenter",
    DRAGOVER: "dragover",
    DRAGLEAVE: "dragleave",
    DROP: "drop",
    DRAGEND: "dragend",
    TOUCHSTART: "touchstart",
    TOUCHMOVE: "touchmove",
    TOUCHEND: "touchend",
    TOUCHCANCEL: "touchcancel",
    BEFOREUNLOAD: "beforeunload",
    CONSOLEMESSAGE: "consolemessage",
    CONTEXTMENU: "contextmenu",
    DOMCONTENTLOADED: "DOMContentLoaded",
    ERROR: "error",
    HELP: "help",
    LOAD: "load",
    LOSECAPTURE: "losecapture",
    ORIENTATIONCHANGE: "orientationchange",
    READYSTATECHANGE: "readystatechange",
    RESIZE: "resize",
    SCROLL: "scroll",
    UNLOAD: "unload",
    HASHCHANGE: "hashchange",
    PAGEHIDE: "pagehide",
    PAGESHOW: "pageshow",
    POPSTATE: "popstate",
    COPY: "copy",
    PASTE: "paste",
    CUT: "cut",
    BEFORECOPY: "beforecopy",
    BEFORECUT: "beforecut",
    BEFOREPASTE: "beforepaste",
    ONLINE: "online",
    OFFLINE: "offline",
    MESSAGE: "message",
    CONNECT: "connect",
    ANIMATIONSTART: goog.events.getVendorPrefixedName_("AnimationStart"),
    ANIMATIONEND: goog.events.getVendorPrefixedName_("AnimationEnd"),
    ANIMATIONITERATION: goog.events.getVendorPrefixedName_("AnimationIteration"),
    TRANSITIONEND: goog.events.getVendorPrefixedName_("TransitionEnd"),
    POINTERDOWN: "pointerdown",
    POINTERUP: "pointerup",
    POINTERCANCEL: "pointercancel",
    POINTERMOVE: "pointermove",
    POINTEROVER: "pointerover",
    POINTEROUT: "pointerout",
    POINTERENTER: "pointerenter",
    POINTERLEAVE: "pointerleave",
    GOTPOINTERCAPTURE: "gotpointercapture",
    LOSTPOINTERCAPTURE: "lostpointercapture",
    MSGESTURECHANGE: "MSGestureChange",
    MSGESTUREEND: "MSGestureEnd",
    MSGESTUREHOLD: "MSGestureHold",
    MSGESTURESTART: "MSGestureStart",
    MSGESTURETAP: "MSGestureTap",
    MSGOTPOINTERCAPTURE: "MSGotPointerCapture",
    MSINERTIASTART: "MSInertiaStart",
    MSLOSTPOINTERCAPTURE: "MSLostPointerCapture",
    MSPOINTERCANCEL: "MSPointerCancel",
    MSPOINTERDOWN: "MSPointerDown",
    MSPOINTERENTER: "MSPointerEnter",
    MSPOINTERHOVER: "MSPointerHover",
    MSPOINTERLEAVE: "MSPointerLeave",
    MSPOINTERMOVE: "MSPointerMove",
    MSPOINTEROUT: "MSPointerOut",
    MSPOINTEROVER: "MSPointerOver",
    MSPOINTERUP: "MSPointerUp",
    TEXT: "text",
    TEXTINPUT: "textInput",
    COMPOSITIONSTART: "compositionstart",
    COMPOSITIONUPDATE: "compositionupdate",
    COMPOSITIONEND: "compositionend",
    EXIT: "exit",
    LOADABORT: "loadabort",
    LOADCOMMIT: "loadcommit",
    LOADREDIRECT: "loadredirect",
    LOADSTART: "loadstart",
    LOADSTOP: "loadstop",
    RESPONSIVE: "responsive",
    SIZECHANGED: "sizechanged",
    UNRESPONSIVE: "unresponsive",
    VISIBILITYCHANGE: "visibilitychange",
    STORAGE: "storage",
    DOMSUBTREEMODIFIED: "DOMSubtreeModified",
    DOMNODEINSERTED: "DOMNodeInserted",
    DOMNODEREMOVED: "DOMNodeRemoved",
    DOMNODEREMOVEDFROMDOCUMENT: "DOMNodeRemovedFromDocument",
    DOMNODEINSERTEDINTODOCUMENT: "DOMNodeInsertedIntoDocument",
    DOMATTRMODIFIED: "DOMAttrModified",
    DOMCHARACTERDATAMODIFIED: "DOMCharacterDataModified",
    BEFOREPRINT: "beforeprint",
    AFTERPRINT: "afterprint"
};
goog.reflect = {};
goog.reflect.object = function(a, b) {
    return b
};
goog.reflect.sinkValue = function(a) {
    goog.reflect.sinkValue[" "](a);
    return a
};
goog.reflect.sinkValue[" "] = goog.nullFunction;
goog.reflect.canAccessProperty = function(a, b) {
    try {
        return goog.reflect.sinkValue(a[b]), !0
    } catch (c) {}
    return !1
};
goog.disposable = {};
goog.disposable.IDisposable = function() {};
goog.Disposable = function() {
    goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF && (goog.Disposable.INCLUDE_STACK_ON_CREATION && (this.creationStack = Error().stack), goog.Disposable.instances_[goog.getUid(this)] = this);
    this.disposed_ = this.disposed_;
    this.onDisposeCallbacks_ = this.onDisposeCallbacks_
};
goog.Disposable.MonitoringMode = {
    OFF: 0,
    PERMANENT: 1,
    INTERACTIVE: 2
};
goog.Disposable.MONITORING_MODE = 0;
goog.Disposable.INCLUDE_STACK_ON_CREATION = !0;
goog.Disposable.instances_ = {};
goog.Disposable.getUndisposedObjects = function() {
    var a = [],
        b;
    for (b in goog.Disposable.instances_) goog.Disposable.instances_.hasOwnProperty(b) && a.push(goog.Disposable.instances_[Number(b)]);
    return a
};
goog.Disposable.clearUndisposedObjects = function() {
    goog.Disposable.instances_ = {}
};
goog.Disposable.prototype.disposed_ = !1;
goog.Disposable.prototype.isDisposed = function() {
    return this.disposed_
};
goog.Disposable.prototype.getDisposed = goog.Disposable.prototype.isDisposed;
goog.Disposable.prototype.dispose = function() {
    if (!this.disposed_ && (this.disposed_ = !0, this.disposeInternal(), goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF)) {
        var a = goog.getUid(this);
        if (goog.Disposable.MONITORING_MODE == goog.Disposable.MonitoringMode.PERMANENT && !goog.Disposable.instances_.hasOwnProperty(a)) throw Error(this + " did not call the goog.Disposable base constructor or was disposed of after a clearUndisposedObjects call");
        delete goog.Disposable.instances_[a]
    }
};
goog.Disposable.prototype.registerDisposable = function(a) {
    this.addOnDisposeCallback(goog.partial(goog.dispose, a))
};
goog.Disposable.prototype.addOnDisposeCallback = function(a, b) {
    this.disposed_ ? a.call(b) : (this.onDisposeCallbacks_ || (this.onDisposeCallbacks_ = []), this.onDisposeCallbacks_.push(goog.isDef(b) ? goog.bind(a, b) : a))
};
goog.Disposable.prototype.disposeInternal = function() {
    if (this.onDisposeCallbacks_)
        for (; this.onDisposeCallbacks_.length;) this.onDisposeCallbacks_.shift()()
};
goog.Disposable.isDisposed = function(a) {
    return a && "function" == typeof a.isDisposed ? a.isDisposed() : !1
};
goog.dispose = function(a) {
    a && "function" == typeof a.dispose && a.dispose()
};
goog.disposeAll = function(a) {
    for (var b = 0, c = arguments.length; b < c; ++b) {
        var d = arguments[b];
        goog.isArrayLike(d) ? goog.disposeAll.apply(null, d) : goog.dispose(d)
    }
};
goog.events.Event = function(a, b) {
    this.type = a instanceof goog.events.EventId ? String(a) : a;
    this.currentTarget = this.target = b;
    this.defaultPrevented = this.propagationStopped_ = !1;
    this.returnValue_ = !0
};
goog.events.Event.prototype.stopPropagation = function() {
    this.propagationStopped_ = !0
};
goog.events.Event.prototype.preventDefault = function() {
    this.defaultPrevented = !0;
    this.returnValue_ = !1
};
goog.events.Event.stopPropagation = function(a) {
    a.stopPropagation()
};
goog.events.Event.preventDefault = function(a) {
    a.preventDefault()
};
goog.events.BrowserEvent = function(a, b) {
    goog.events.Event.call(this, a ? a.type : "");
    this.relatedTarget = this.currentTarget = this.target = null;
    this.charCode = this.keyCode = this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
    this.state = null;
    this.platformModifierKey = !1;
    this.event_ = null;
    a && this.init(a, b)
};
goog.inherits(goog.events.BrowserEvent, goog.events.Event);
goog.events.BrowserEvent.MouseButton = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2
};
goog.events.BrowserEvent.IEButtonMap = [1, 4, 2];
goog.events.BrowserEvent.prototype.init = function(a, b) {
    var c = this.type = a.type,
        d = a.changedTouches ? a.changedTouches[0] : null;
    this.target = a.target || a.srcElement;
    this.currentTarget = b;
    var e = a.relatedTarget;
    e ? goog.userAgent.GECKO && (goog.reflect.canAccessProperty(e, "nodeName") || (e = null)) : c == goog.events.EventType.MOUSEOVER ? e = a.fromElement : c == goog.events.EventType.MOUSEOUT && (e = a.toElement);
    this.relatedTarget = e;
    goog.isNull(d) ? (this.offsetX = goog.userAgent.WEBKIT || void 0 !== a.offsetX ? a.offsetX : a.layerX, this.offsetY =
        goog.userAgent.WEBKIT || void 0 !== a.offsetY ? a.offsetY : a.layerY, this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0) : (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0);
    this.button = a.button;
    this.keyCode = a.keyCode || 0;
    this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
    this.ctrlKey = a.ctrlKey;
    this.altKey =
        a.altKey;
    this.shiftKey = a.shiftKey;
    this.metaKey = a.metaKey;
    this.platformModifierKey = goog.userAgent.MAC ? a.metaKey : a.ctrlKey;
    this.state = a.state;
    this.event_ = a;
    a.defaultPrevented && this.preventDefault()
};
goog.events.BrowserEvent.prototype.isButton = function(a) {
    return goog.events.BrowserFeature.HAS_W3C_BUTTON ? this.event_.button == a : "click" == this.type ? a == goog.events.BrowserEvent.MouseButton.LEFT : !!(this.event_.button & goog.events.BrowserEvent.IEButtonMap[a])
};
goog.events.BrowserEvent.prototype.isMouseActionButton = function() {
    return this.isButton(goog.events.BrowserEvent.MouseButton.LEFT) && !(goog.userAgent.WEBKIT && goog.userAgent.MAC && this.ctrlKey)
};
goog.events.BrowserEvent.prototype.stopPropagation = function() {
    goog.events.BrowserEvent.superClass_.stopPropagation.call(this);
    this.event_.stopPropagation ? this.event_.stopPropagation() : this.event_.cancelBubble = !0
};
goog.events.BrowserEvent.prototype.preventDefault = function() {
    goog.events.BrowserEvent.superClass_.preventDefault.call(this);
    var a = this.event_;
    if (a.preventDefault) a.preventDefault();
    else if (a.returnValue = !1, goog.events.BrowserFeature.SET_KEY_CODE_TO_PREVENT_DEFAULT) try {
        if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) a.keyCode = -1
    } catch (b) {}
};
goog.events.BrowserEvent.prototype.getBrowserEvent = function() {
    return this.event_
};
goog.debug.entryPointRegistry = {};
goog.debug.EntryPointMonitor = function() {};
goog.debug.entryPointRegistry.refList_ = [];
goog.debug.entryPointRegistry.monitors_ = [];
goog.debug.entryPointRegistry.monitorsMayExist_ = !1;
goog.debug.entryPointRegistry.register = function(a) {
    goog.debug.entryPointRegistry.refList_[goog.debug.entryPointRegistry.refList_.length] = a;
    if (goog.debug.entryPointRegistry.monitorsMayExist_)
        for (var b = goog.debug.entryPointRegistry.monitors_, c = 0; c < b.length; c++) a(goog.bind(b[c].wrap, b[c]))
};
goog.debug.entryPointRegistry.monitorAll = function(a) {
    goog.debug.entryPointRegistry.monitorsMayExist_ = !0;
    for (var b = goog.bind(a.wrap, a), c = 0; c < goog.debug.entryPointRegistry.refList_.length; c++) goog.debug.entryPointRegistry.refList_[c](b);
    goog.debug.entryPointRegistry.monitors_.push(a)
};
goog.debug.entryPointRegistry.unmonitorAllIfPossible = function(a) {
    var b = goog.debug.entryPointRegistry.monitors_;
    goog.asserts.assert(a == b[b.length - 1], "Only the most recent monitor can be unwrapped.");
    a = goog.bind(a.unwrap, a);
    for (var c = 0; c < goog.debug.entryPointRegistry.refList_.length; c++) goog.debug.entryPointRegistry.refList_[c](a);
    b.length--
};
goog.events.Listener = function(a, b, c, d, e, f) {
    goog.events.Listener.ENABLE_MONITORING && (this.creationStack = Error().stack);
    this.listener = a;
    this.proxy = b;
    this.src = c;
    this.type = d;
    this.capture = !!e;
    this.handler = f;
    this.key = goog.events.ListenableKey.reserveKey();
    this.removed = this.callOnce = !1
};
goog.events.Listener.ENABLE_MONITORING = !1;
goog.events.Listener.prototype.markAsRemoved = function() {
    this.removed = !0;
    this.handler = this.src = this.proxy = this.listener = null
};
goog.events.ListenerMap = function(a) {
    this.src = a;
    this.listeners = {};
    this.typeCount_ = 0
};
goog.events.ListenerMap.prototype.getTypeCount = function() {
    return this.typeCount_
};
goog.events.ListenerMap.prototype.getListenerCount = function() {
    var a = 0,
        b;
    for (b in this.listeners) a += this.listeners[b].length;
    return a
};
goog.events.ListenerMap.prototype.add = function(a, b, c, d, e) {
    var f = a.toString();
    a = this.listeners[f];
    a || (a = this.listeners[f] = [], this.typeCount_++);
    var g = goog.events.ListenerMap.findListenerIndex_(a, b, d, e); - 1 < g ? (b = a[g], c || (b.callOnce = !1)) : (b = new goog.events.Listener(b, null, this.src, f, !!d, e), b.callOnce = c, a.push(b));
    return b
};
goog.events.ListenerMap.prototype.remove = function(a, b, c, d) {
    a = a.toString();
    if (!(a in this.listeners)) return !1;
    var e = this.listeners[a];
    b = goog.events.ListenerMap.findListenerIndex_(e, b, c, d);
    return -1 < b ? (e[b].markAsRemoved(), goog.array.removeAt(e, b), 0 == e.length && (delete this.listeners[a], this.typeCount_--), !0) : !1
};
goog.events.ListenerMap.prototype.removeByKey = function(a) {
    var b = a.type;
    if (!(b in this.listeners)) return !1;
    var c = goog.array.remove(this.listeners[b], a);
    c && (a.markAsRemoved(), 0 == this.listeners[b].length && (delete this.listeners[b], this.typeCount_--));
    return c
};
goog.events.ListenerMap.prototype.removeAll = function(a) {
    a = a && a.toString();
    var b = 0,
        c;
    for (c in this.listeners)
        if (!a || c == a) {
            for (var d = this.listeners[c], e = 0; e < d.length; e++) ++b, d[e].markAsRemoved();
            delete this.listeners[c];
            this.typeCount_--
        }
    return b
};
goog.events.ListenerMap.prototype.getListeners = function(a, b) {
    var c = this.listeners[a.toString()],
        d = [];
    if (c)
        for (var e = 0; e < c.length; ++e) {
            var f = c[e];
            f.capture == b && d.push(f)
        }
    return d
};
goog.events.ListenerMap.prototype.getListener = function(a, b, c, d) {
    a = this.listeners[a.toString()];
    var e = -1;
    a && (e = goog.events.ListenerMap.findListenerIndex_(a, b, c, d));
    return -1 < e ? a[e] : null
};
goog.events.ListenerMap.prototype.hasListener = function(a, b) {
    var c = goog.isDef(a),
        d = c ? a.toString() : "",
        e = goog.isDef(b);
    return goog.object.some(this.listeners, function(a, g) {
        for (var h = 0; h < a.length; ++h)
            if (!(c && a[h].type != d || e && a[h].capture != b)) return !0;
        return !1
    })
};
goog.events.ListenerMap.findListenerIndex_ = function(a, b, c, d) {
    for (var e = 0; e < a.length; ++e) {
        var f = a[e];
        if (!f.removed && f.listener == b && f.capture == !!c && f.handler == d) return e
    }
    return -1
};
goog.events.LISTENER_MAP_PROP_ = "closure_lm_" + (1E6 * Math.random() | 0);
goog.events.onString_ = "on";
goog.events.onStringMap_ = {};
goog.events.CaptureSimulationMode = {
    OFF_AND_FAIL: 0,
    OFF_AND_SILENT: 1,
    ON: 2
};
goog.events.CAPTURE_SIMULATION_MODE = 2;
goog.events.listenerCountEstimate_ = 0;
goog.events.listen = function(a, b, c, d, e) {
    if (goog.isArray(b)) {
        for (var f = 0; f < b.length; f++) goog.events.listen(a, b[f], c, d, e);
        return null
    }
    c = goog.events.wrapListener(c);
    return goog.events.Listenable.isImplementedBy(a) ? a.listen(b, c, d, e) : goog.events.listen_(a, b, c, !1, d, e)
};
goog.events.listen_ = function(a, b, c, d, e, f) {
    if (!b) throw Error("Invalid event type");
    var g = !!e;
    if (g && !goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT) {
        if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.OFF_AND_FAIL) return goog.asserts.fail("Can not register capture listener in IE8-."), null;
        if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.OFF_AND_SILENT) return null
    }
    var h = goog.events.getListenerMap_(a);
    h || (a[goog.events.LISTENER_MAP_PROP_] = h = new goog.events.ListenerMap(a));
    c = h.add(b, c, d, e, f);
    if (c.proxy) return c;
    d = goog.events.getProxy();
    c.proxy = d;
    d.src = a;
    d.listener = c;
    if (a.addEventListener) a.addEventListener(b.toString(), d, g);
    else if (a.attachEvent) a.attachEvent(goog.events.getOnString_(b.toString()), d);
    else throw Error("addEventListener and attachEvent are unavailable.");
    goog.events.listenerCountEstimate_++;
    return c
};
goog.events.getProxy = function() {
    var a = goog.events.handleBrowserEvent_,
        b = goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT ? function(c) {
            return a.call(b.src, b.listener, c)
        } : function(c) {
            c = a.call(b.src, b.listener, c);
            if (!c) return c
        };
    return b
};
goog.events.listenOnce = function(a, b, c, d, e) {
    if (goog.isArray(b)) {
        for (var f = 0; f < b.length; f++) goog.events.listenOnce(a, b[f], c, d, e);
        return null
    }
    c = goog.events.wrapListener(c);
    return goog.events.Listenable.isImplementedBy(a) ? a.listenOnce(b, c, d, e) : goog.events.listen_(a, b, c, !0, d, e)
};
goog.events.listenWithWrapper = function(a, b, c, d, e) {
    b.listen(a, c, d, e)
};
goog.events.unlisten = function(a, b, c, d, e) {
    if (goog.isArray(b)) {
        for (var f = 0; f < b.length; f++) goog.events.unlisten(a, b[f], c, d, e);
        return null
    }
    c = goog.events.wrapListener(c);
    if (goog.events.Listenable.isImplementedBy(a)) return a.unlisten(b, c, d, e);
    if (!a) return !1;
    d = !!d;
    if (a = goog.events.getListenerMap_(a))
        if (b = a.getListener(b, c, d, e)) return goog.events.unlistenByKey(b);
    return !1
};
goog.events.unlistenByKey = function(a) {
    if (goog.isNumber(a) || !a || a.removed) return !1;
    var b = a.src;
    if (goog.events.Listenable.isImplementedBy(b)) return b.unlistenByKey(a);
    var c = a.type,
        d = a.proxy;
    b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent && b.detachEvent(goog.events.getOnString_(c), d);
    goog.events.listenerCountEstimate_--;
    (c = goog.events.getListenerMap_(b)) ? (c.removeByKey(a), 0 == c.getTypeCount() && (c.src = null, b[goog.events.LISTENER_MAP_PROP_] = null)) : a.markAsRemoved();
    return !0
};
goog.events.unlistenWithWrapper = function(a, b, c, d, e) {
    b.unlisten(a, c, d, e)
};
goog.events.removeAll = function(a, b) {
    if (!a) return 0;
    if (goog.events.Listenable.isImplementedBy(a)) return a.removeAllListeners(b);
    var c = goog.events.getListenerMap_(a);
    if (!c) return 0;
    var d = 0,
        e = b && b.toString(),
        f;
    for (f in c.listeners)
        if (!e || f == e)
            for (var g = c.listeners[f].concat(), h = 0; h < g.length; ++h) goog.events.unlistenByKey(g[h]) && ++d;
    return d
};
goog.events.getListeners = function(a, b, c) {
    return goog.events.Listenable.isImplementedBy(a) ? a.getListeners(b, c) : a ? (a = goog.events.getListenerMap_(a)) ? a.getListeners(b, c) : [] : []
};
goog.events.getListener = function(a, b, c, d, e) {
    c = goog.events.wrapListener(c);
    d = !!d;
    return goog.events.Listenable.isImplementedBy(a) ? a.getListener(b, c, d, e) : a ? (a = goog.events.getListenerMap_(a)) ? a.getListener(b, c, d, e) : null : null
};
goog.events.hasListener = function(a, b, c) {
    if (goog.events.Listenable.isImplementedBy(a)) return a.hasListener(b, c);
    a = goog.events.getListenerMap_(a);
    return !!a && a.hasListener(b, c)
};
goog.events.expose = function(a) {
    var b = [],
        c;
    for (c in a) a[c] && a[c].id ? b.push(c + " = " + a[c] + " (" + a[c].id + ")") : b.push(c + " = " + a[c]);
    return b.join("\n")
};
goog.events.getOnString_ = function(a) {
    return a in goog.events.onStringMap_ ? goog.events.onStringMap_[a] : goog.events.onStringMap_[a] = goog.events.onString_ + a
};
goog.events.fireListeners = function(a, b, c, d) {
    return goog.events.Listenable.isImplementedBy(a) ? a.fireListeners(b, c, d) : goog.events.fireListeners_(a, b, c, d)
};
goog.events.fireListeners_ = function(a, b, c, d) {
    var e = !0;
    if (a = goog.events.getListenerMap_(a))
        if (b = a.listeners[b.toString()])
            for (b = b.concat(), a = 0; a < b.length; a++) {
                var f = b[a];
                f && f.capture == c && !f.removed && (f = goog.events.fireListener(f, d), e = e && !1 !== f)
            }
        return e
};
goog.events.fireListener = function(a, b) {
    var c = a.listener,
        d = a.handler || a.src;
    a.callOnce && goog.events.unlistenByKey(a);
    return c.call(d, b)
};
goog.events.getTotalListenerCount = function() {
    return goog.events.listenerCountEstimate_
};
goog.events.dispatchEvent = function(a, b) {
    goog.asserts.assert(goog.events.Listenable.isImplementedBy(a), "Can not use goog.events.dispatchEvent with non-goog.events.Listenable instance.");
    return a.dispatchEvent(b)
};
goog.events.protectBrowserEventEntryPoint = function(a) {
    goog.events.handleBrowserEvent_ = a.protectEntryPoint(goog.events.handleBrowserEvent_)
};
goog.events.handleBrowserEvent_ = function(a, b) {
    if (a.removed) return !0;
    if (!goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT) {
        var c = b || goog.getObjectByName("window.event"),
            d = new goog.events.BrowserEvent(c, this),
            e = !0;
        if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.ON) {
            if (!goog.events.isMarkedIeEvent_(c)) {
                goog.events.markIeEvent_(c);
                for (var c = [], f = d.currentTarget; f; f = f.parentNode) c.push(f);
                for (var f = a.type, g = c.length - 1; !d.propagationStopped_ && 0 <= g; g--) {
                    d.currentTarget = c[g];
                    var h =
                        goog.events.fireListeners_(c[g], f, !0, d),
                        e = e && h
                }
                for (g = 0; !d.propagationStopped_ && g < c.length; g++) d.currentTarget = c[g], h = goog.events.fireListeners_(c[g], f, !1, d), e = e && h
            }
        } else e = goog.events.fireListener(a, d);
        return e
    }
    return goog.events.fireListener(a, new goog.events.BrowserEvent(b, this))
};
goog.events.markIeEvent_ = function(a) {
    var b = !1;
    if (0 == a.keyCode) try {
        a.keyCode = -1;
        return
    } catch (c) {
        b = !0
    }
    if (b || void 0 == a.returnValue) a.returnValue = !0
};
goog.events.isMarkedIeEvent_ = function(a) {
    return 0 > a.keyCode || void 0 != a.returnValue
};
goog.events.uniqueIdCounter_ = 0;
goog.events.getUniqueId = function(a) {
    return a + "_" + goog.events.uniqueIdCounter_++
};
goog.events.getListenerMap_ = function(a) {
    a = a[goog.events.LISTENER_MAP_PROP_];
    return a instanceof goog.events.ListenerMap ? a : null
};
goog.events.LISTENER_WRAPPER_PROP_ = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);
goog.events.wrapListener = function(a) {
    goog.asserts.assert(a, "Listener can not be null.");
    if (goog.isFunction(a)) return a;
    goog.asserts.assert(a.handleEvent, "An object listener must have handleEvent method.");
    a[goog.events.LISTENER_WRAPPER_PROP_] || (a[goog.events.LISTENER_WRAPPER_PROP_] = function(b) {
        return a.handleEvent(b)
    });
    return a[goog.events.LISTENER_WRAPPER_PROP_]
};
goog.debug.entryPointRegistry.register(function(a) {
    goog.events.handleBrowserEvent_ = a(goog.events.handleBrowserEvent_)
});
goog.dom.TagName = {
    A: "A",
    ABBR: "ABBR",
    ACRONYM: "ACRONYM",
    ADDRESS: "ADDRESS",
    APPLET: "APPLET",
    AREA: "AREA",
    ARTICLE: "ARTICLE",
    ASIDE: "ASIDE",
    AUDIO: "AUDIO",
    B: "B",
    BASE: "BASE",
    BASEFONT: "BASEFONT",
    BDI: "BDI",
    BDO: "BDO",
    BIG: "BIG",
    BLOCKQUOTE: "BLOCKQUOTE",
    BODY: "BODY",
    BR: "BR",
    BUTTON: "BUTTON",
    CANVAS: "CANVAS",
    CAPTION: "CAPTION",
    CENTER: "CENTER",
    CITE: "CITE",
    CODE: "CODE",
    COL: "COL",
    COLGROUP: "COLGROUP",
    COMMAND: "COMMAND",
    DATA: "DATA",
    DATALIST: "DATALIST",
    DD: "DD",
    DEL: "DEL",
    DETAILS: "DETAILS",
    DFN: "DFN",
    DIALOG: "DIALOG",
    DIR: "DIR",
    DIV: "DIV",
    DL: "DL",
    DT: "DT",
    EM: "EM",
    EMBED: "EMBED",
    FIELDSET: "FIELDSET",
    FIGCAPTION: "FIGCAPTION",
    FIGURE: "FIGURE",
    FONT: "FONT",
    FOOTER: "FOOTER",
    FORM: "FORM",
    FRAME: "FRAME",
    FRAMESET: "FRAMESET",
    H1: "H1",
    H2: "H2",
    H3: "H3",
    H4: "H4",
    H5: "H5",
    H6: "H6",
    HEAD: "HEAD",
    HEADER: "HEADER",
    HGROUP: "HGROUP",
    HR: "HR",
    HTML: "HTML",
    I: "I",
    IFRAME: "IFRAME",
    IMG: "IMG",
    INPUT: "INPUT",
    INS: "INS",
    ISINDEX: "ISINDEX",
    KBD: "KBD",
    KEYGEN: "KEYGEN",
    LABEL: "LABEL",
    LEGEND: "LEGEND",
    LI: "LI",
    LINK: "LINK",
    MAP: "MAP",
    MARK: "MARK",
    MATH: "MATH",
    MENU: "MENU",
    META: "META",
    METER: "METER",
    NAV: "NAV",
    NOFRAMES: "NOFRAMES",
    NOSCRIPT: "NOSCRIPT",
    OBJECT: "OBJECT",
    OL: "OL",
    OPTGROUP: "OPTGROUP",
    OPTION: "OPTION",
    OUTPUT: "OUTPUT",
    P: "P",
    PARAM: "PARAM",
    PRE: "PRE",
    PROGRESS: "PROGRESS",
    Q: "Q",
    RP: "RP",
    RT: "RT",
    RUBY: "RUBY",
    S: "S",
    SAMP: "SAMP",
    SCRIPT: "SCRIPT",
    SECTION: "SECTION",
    SELECT: "SELECT",
    SMALL: "SMALL",
    SOURCE: "SOURCE",
    SPAN: "SPAN",
    STRIKE: "STRIKE",
    STRONG: "STRONG",
    STYLE: "STYLE",
    SUB: "SUB",
    SUMMARY: "SUMMARY",
    SUP: "SUP",
    SVG: "SVG",
    TABLE: "TABLE",
    TBODY: "TBODY",
    TD: "TD",
    TEMPLATE: "TEMPLATE",
    TEXTAREA: "TEXTAREA",
    TFOOT: "TFOOT",
    TH: "TH",
    THEAD: "THEAD",
    TIME: "TIME",
    TITLE: "TITLE",
    TR: "TR",
    TRACK: "TRACK",
    TT: "TT",
    U: "U",
    UL: "UL",
    VAR: "VAR",
    VIDEO: "VIDEO",
    WBR: "WBR"
};
goog.Thenable = function() {};
goog.Thenable.prototype.then = function(a, b, c) {};
goog.Thenable.IMPLEMENTED_BY_PROP = "$goog_Thenable";
goog.Thenable.addImplementation = function(a) {
    goog.exportProperty(a.prototype, "then", a.prototype.then);
    COMPILED ? a.prototype[goog.Thenable.IMPLEMENTED_BY_PROP] = !0 : a.prototype.$goog_Thenable = !0
};
goog.Thenable.isImplementedBy = function(a) {
    if (!a) return !1;
    try {
        return COMPILED ? !!a[goog.Thenable.IMPLEMENTED_BY_PROP] : !!a.$goog_Thenable
    } catch (b) {
        return !1
    }
};
goog.async = {};
goog.async.FreeList = function(a, b, c) {
    this.limit_ = c;
    this.create_ = a;
    this.reset_ = b;
    this.occupants_ = 0;
    this.head_ = null
};
goog.async.FreeList.prototype.get = function() {
    var a;
    0 < this.occupants_ ? (this.occupants_--, a = this.head_, this.head_ = a.next, a.next = null) : a = this.create_();
    return a
};
goog.async.FreeList.prototype.put = function(a) {
    this.reset_(a);
    this.occupants_ < this.limit_ && (this.occupants_++, a.next = this.head_, this.head_ = a)
};
goog.async.FreeList.prototype.occupants = function() {
    return this.occupants_
};
goog.async.WorkQueue = function() {
    this.workTail_ = this.workHead_ = null
};
goog.async.WorkQueue.DEFAULT_MAX_UNUSED = 100;
goog.async.WorkQueue.freelist_ = new goog.async.FreeList(function() {
    return new goog.async.WorkItem
}, function(a) {
    a.reset()
}, goog.async.WorkQueue.DEFAULT_MAX_UNUSED);
goog.async.WorkQueue.prototype.add = function(a, b) {
    var c = this.getUnusedItem_();
    c.set(a, b);
    this.workTail_ ? this.workTail_.next = c : (goog.asserts.assert(!this.workHead_), this.workHead_ = c);
    this.workTail_ = c
};
goog.async.WorkQueue.prototype.remove = function() {
    var a = null;
    this.workHead_ && (a = this.workHead_, this.workHead_ = this.workHead_.next, this.workHead_ || (this.workTail_ = null), a.next = null);
    return a
};
goog.async.WorkQueue.prototype.returnUnused = function(a) {
    goog.async.WorkQueue.freelist_.put(a)
};
goog.async.WorkQueue.prototype.getUnusedItem_ = function() {
    return goog.async.WorkQueue.freelist_.get()
};
goog.async.WorkItem = function() {
    this.next = this.scope = this.fn = null
};
goog.async.WorkItem.prototype.set = function(a, b) {
    this.fn = a;
    this.scope = b;
    this.next = null
};
goog.async.WorkItem.prototype.reset = function() {
    this.next = this.scope = this.fn = null
};
goog.functions = {};
goog.functions.constant = function(a) {
    return function() {
        return a
    }
};
goog.functions.FALSE = goog.functions.constant(!1);
goog.functions.TRUE = goog.functions.constant(!0);
goog.functions.NULL = goog.functions.constant(null);
goog.functions.identity = function(a, b) {
    return a
};
goog.functions.error = function(a) {
    return function() {
        throw Error(a);
    }
};
goog.functions.fail = function(a) {
    return function() {
        throw a;
    }
};
goog.functions.lock = function(a, b) {
    b = b || 0;
    return function() {
        return a.apply(this, Array.prototype.slice.call(arguments, 0, b))
    }
};
goog.functions.nth = function(a) {
    return function() {
        return arguments[a]
    }
};
goog.functions.withReturnValue = function(a, b) {
    return goog.functions.sequence(a, goog.functions.constant(b))
};
goog.functions.equalTo = function(a, b) {
    return function(c) {
        return b ? a == c : a === c
    }
};
goog.functions.compose = function(a, b) {
    var c = arguments,
        d = c.length;
    return function() {
        var a;
        d && (a = c[d - 1].apply(this, arguments));
        for (var b = d - 2; 0 <= b; b--) a = c[b].call(this, a);
        return a
    }
};
goog.functions.sequence = function(a) {
    var b = arguments,
        c = b.length;
    return function() {
        for (var a, e = 0; e < c; e++) a = b[e].apply(this, arguments);
        return a
    }
};
goog.functions.and = function(a) {
    var b = arguments,
        c = b.length;
    return function() {
        for (var a = 0; a < c; a++)
            if (!b[a].apply(this, arguments)) return !1;
        return !0
    }
};
goog.functions.or = function(a) {
    var b = arguments,
        c = b.length;
    return function() {
        for (var a = 0; a < c; a++)
            if (b[a].apply(this, arguments)) return !0;
        return !1
    }
};
goog.functions.not = function(a) {
    return function() {
        return !a.apply(this, arguments)
    }
};
goog.functions.create = function(a, b) {
    var c = function() {};
    c.prototype = a.prototype;
    c = new c;
    a.apply(c, Array.prototype.slice.call(arguments, 1));
    return c
};
goog.functions.CACHE_RETURN_VALUE = !0;
goog.functions.cacheReturnValue = function(a) {
    var b = !1,
        c;
    return function() {
        if (!goog.functions.CACHE_RETURN_VALUE) return a();
        b || (c = a(), b = !0);
        return c
    }
};
goog.functions.once = function(a) {
    var b = a;
    return function() {
        if (b) {
            var a = b;
            b = null;
            a()
        }
    }
};
goog.functions.debounce = function(a, b, c) {
    c && (a = goog.bind(a, c));
    var d = null;
    return function(c) {
        goog.global.clearTimeout(d);
        var f = arguments;
        d = goog.global.setTimeout(function() {
            a.apply(null, f)
        }, b)
    }
};
goog.functions.throttle = function(a, b, c) {
    c && (a = goog.bind(a, c));
    var d = null,
        e = !1,
        f = [],
        g = function() {
            d = null;
            e && (e = !1, h())
        },
        h = function() {
            d = goog.global.setTimeout(g, b);
            a.apply(null, f)
        };
    return function(a) {
        f = arguments;
        d ? e = !0 : h()
    }
};
goog.async.throwException = function(a) {
    goog.global.setTimeout(function() {
        throw a;
    }, 0)
};
goog.async.nextTick = function(a, b, c) {
    var d = a;
    b && (d = goog.bind(a, b));
    d = goog.async.nextTick.wrapCallback_(d);
    goog.isFunction(goog.global.setImmediate) && (c || goog.async.nextTick.useSetImmediate_()) ? goog.global.setImmediate(d) : (goog.async.nextTick.setImmediate_ || (goog.async.nextTick.setImmediate_ = goog.async.nextTick.getSetImmediateEmulator_()), goog.async.nextTick.setImmediate_(d))
};
goog.async.nextTick.useSetImmediate_ = function() {
    return goog.global.Window && goog.global.Window.prototype && !goog.labs.userAgent.browser.isEdge() && goog.global.Window.prototype.setImmediate == goog.global.setImmediate ? !1 : !0
};
goog.async.nextTick.getSetImmediateEmulator_ = function() {
    var a = goog.global.MessageChannel;
    "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !goog.labs.userAgent.engine.isPresto() && (a = function() {
        var a = document.createElement(goog.dom.TagName.IFRAME);
        a.style.display = "none";
        a.src = "";
        document.documentElement.appendChild(a);
        var b = a.contentWindow,
            a = b.document;
        a.open();
        a.write("");
        a.close();
        var c = "callImmediate" + Math.random(),
            d = "file:" == b.location.protocol ? "*" :
            b.location.protocol + "//" + b.location.host,
            a = goog.bind(function(a) {
                if (("*" == d || a.origin == d) && a.data == c) this.port1.onmessage()
            }, this);
        b.addEventListener("message", a, !1);
        this.port1 = {};
        this.port2 = {
            postMessage: function() {
                b.postMessage(c, d)
            }
        }
    });
    if ("undefined" !== typeof a && !goog.labs.userAgent.browser.isIE()) {
        var b = new a,
            c = {},
            d = c;
        b.port1.onmessage = function() {
            if (goog.isDef(c.next)) {
                c = c.next;
                var a = c.cb;
                c.cb = null;
                a()
            }
        };
        return function(a) {
            d.next = {
                cb: a
            };
            d = d.next;
            b.port2.postMessage(0)
        }
    }
    return "undefined" !== typeof document &&
        "onreadystatechange" in document.createElement(goog.dom.TagName.SCRIPT) ? function(a) {
            var b = document.createElement(goog.dom.TagName.SCRIPT);
            b.onreadystatechange = function() {
                b.onreadystatechange = null;
                b.parentNode.removeChild(b);
                b = null;
                a();
                a = null
            };
            document.documentElement.appendChild(b)
        } : function(a) {
            goog.global.setTimeout(a, 0)
        }
};
goog.async.nextTick.wrapCallback_ = goog.functions.identity;
goog.debug.entryPointRegistry.register(function(a) {
    goog.async.nextTick.wrapCallback_ = a
});
goog.async.run = function(a, b) {
    goog.async.run.schedule_ || goog.async.run.initializeRunner_();
    goog.async.run.workQueueScheduled_ || (goog.async.run.schedule_(), goog.async.run.workQueueScheduled_ = !0);
    goog.async.run.workQueue_.add(a, b)
};
goog.async.run.initializeRunner_ = function() {
    if (goog.global.Promise && goog.global.Promise.resolve) {
        var a = goog.global.Promise.resolve(void 0);
        goog.async.run.schedule_ = function() {
            a.then(goog.async.run.processWorkQueue)
        }
    } else goog.async.run.schedule_ = function() {
        goog.async.nextTick(goog.async.run.processWorkQueue)
    }
};
goog.async.run.forceNextTick = function(a) {
    goog.async.run.schedule_ = function() {
        goog.async.nextTick(goog.async.run.processWorkQueue);
        a && a(goog.async.run.processWorkQueue)
    }
};
goog.async.run.workQueueScheduled_ = !1;
goog.async.run.workQueue_ = new goog.async.WorkQueue;
goog.DEBUG && (goog.async.run.resetQueue = function() {
    goog.async.run.workQueueScheduled_ = !1;
    goog.async.run.workQueue_ = new goog.async.WorkQueue
});
goog.async.run.processWorkQueue = function() {
    for (var a = null; a = goog.async.run.workQueue_.remove();) {
        try {
            a.fn.call(a.scope)
        } catch (b) {
            goog.async.throwException(b)
        }
        goog.async.run.workQueue_.returnUnused(a)
    }
    goog.async.run.workQueueScheduled_ = !1
};
goog.promise = {};
goog.promise.Resolver = function() {};
goog.Promise = function(a, b) {
    this.state_ = goog.Promise.State_.PENDING;
    this.result_ = void 0;
    this.callbackEntriesTail_ = this.callbackEntries_ = this.parent_ = null;
    this.executing_ = !1;
    0 < goog.Promise.UNHANDLED_REJECTION_DELAY ? this.unhandledRejectionId_ = 0 : 0 == goog.Promise.UNHANDLED_REJECTION_DELAY && (this.hadUnhandledRejection_ = !1);
    goog.Promise.LONG_STACK_TRACES && (this.stack_ = [], this.addStackTrace_(Error("created")), this.currentStep_ = 0);
    if (a != goog.nullFunction) try {
        var c = this;
        a.call(b, function(a) {
            c.resolve_(goog.Promise.State_.FULFILLED,
                a)
        }, function(a) {
            if (goog.DEBUG && !(a instanceof goog.Promise.CancellationError)) try {
                if (a instanceof Error) throw a;
                throw Error("Promise rejected.");
            } catch (b) {}
            c.resolve_(goog.Promise.State_.REJECTED, a)
        })
    } catch (d) {
        this.resolve_(goog.Promise.State_.REJECTED, d)
    }
};
goog.Promise.LONG_STACK_TRACES = !1;
goog.Promise.UNHANDLED_REJECTION_DELAY = 0;
goog.Promise.State_ = {
    PENDING: 0,
    BLOCKED: 1,
    FULFILLED: 2,
    REJECTED: 3
};
goog.Promise.CallbackEntry_ = function() {
    this.next = this.context = this.onRejected = this.onFulfilled = this.child = null;
    this.always = !1
};
goog.Promise.CallbackEntry_.prototype.reset = function() {
    this.context = this.onRejected = this.onFulfilled = this.child = null;
    this.always = !1
};
goog.Promise.DEFAULT_MAX_UNUSED = 100;
goog.Promise.freelist_ = new goog.async.FreeList(function() {
    return new goog.Promise.CallbackEntry_
}, function(a) {
    a.reset()
}, goog.Promise.DEFAULT_MAX_UNUSED);
goog.Promise.getCallbackEntry_ = function(a, b, c) {
    var d = goog.Promise.freelist_.get();
    d.onFulfilled = a;
    d.onRejected = b;
    d.context = c;
    return d
};
goog.Promise.returnEntry_ = function(a) {
    goog.Promise.freelist_.put(a)
};
goog.Promise.resolve = function(a) {
    if (a instanceof goog.Promise) return a;
    var b = new goog.Promise(goog.nullFunction);
    b.resolve_(goog.Promise.State_.FULFILLED, a);
    return b
};
goog.Promise.reject = function(a) {
    return new goog.Promise(function(b, c) {
        c(a)
    })
};
goog.Promise.resolveThen_ = function(a, b, c) {
    goog.Promise.maybeThen_(a, b, c, null) || goog.async.run(goog.partial(b, a))
};
goog.Promise.race = function(a) {
    return new goog.Promise(function(b, c) {
        a.length || b(void 0);
        for (var d = 0, e; d < a.length; d++) e = a[d], goog.Promise.resolveThen_(e, b, c)
    })
};
goog.Promise.all = function(a) {
    return new goog.Promise(function(b, c) {
        var d = a.length,
            e = [];
        if (d)
            for (var f = function(a, c) {
                    d--;
                    e[a] = c;
                    0 == d && b(e)
                }, g = function(a) {
                    c(a)
                }, h = 0, k; h < a.length; h++) k = a[h], goog.Promise.resolveThen_(k, goog.partial(f, h), g);
        else b(e)
    })
};
goog.Promise.allSettled = function(a) {
    return new goog.Promise(function(b, c) {
        var d = a.length,
            e = [];
        if (d)
            for (var f = function(a, c, f) {
                    d--;
                    e[a] = c ? {
                        fulfilled: !0,
                        value: f
                    } : {
                        fulfilled: !1,
                        reason: f
                    };
                    0 == d && b(e)
                }, g = 0, h; g < a.length; g++) h = a[g], goog.Promise.resolveThen_(h, goog.partial(f, g, !0), goog.partial(f, g, !1));
        else b(e)
    })
};
goog.Promise.firstFulfilled = function(a) {
    return new goog.Promise(function(b, c) {
        var d = a.length,
            e = [];
        if (d)
            for (var f = function(a) {
                    b(a)
                }, g = function(a, b) {
                    d--;
                    e[a] = b;
                    0 == d && c(e)
                }, h = 0, k; h < a.length; h++) k = a[h], goog.Promise.resolveThen_(k, f, goog.partial(g, h));
        else b(void 0)
    })
};
goog.Promise.withResolver = function() {
    var a, b, c = new goog.Promise(function(c, e) {
        a = c;
        b = e
    });
    return new goog.Promise.Resolver_(c, a, b)
};
goog.Promise.prototype.then = function(a, b, c) {
    null != a && goog.asserts.assertFunction(a, "opt_onFulfilled should be a function.");
    null != b && goog.asserts.assertFunction(b, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");
    goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("then"));
    return this.addChildPromise_(goog.isFunction(a) ? a : null, goog.isFunction(b) ? b : null, c)
};
goog.Thenable.addImplementation(goog.Promise);
goog.Promise.prototype.thenVoid = function(a, b, c) {
    null != a && goog.asserts.assertFunction(a, "opt_onFulfilled should be a function.");
    null != b && goog.asserts.assertFunction(b, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");
    goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("then"));
    this.addCallbackEntry_(goog.Promise.getCallbackEntry_(a || goog.nullFunction, b || null, c))
};
goog.Promise.prototype.thenAlways = function(a, b) {
    goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("thenAlways"));
    var c = goog.Promise.getCallbackEntry_(a, a, b);
    c.always = !0;
    this.addCallbackEntry_(c);
    return this
};
goog.Promise.prototype.thenCatch = function(a, b) {
    goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("thenCatch"));
    return this.addChildPromise_(null, a, b)
};
goog.Promise.prototype.cancel = function(a) {
    this.state_ == goog.Promise.State_.PENDING && goog.async.run(function() {
        var b = new goog.Promise.CancellationError(a);
        this.cancelInternal_(b)
    }, this)
};
goog.Promise.prototype.cancelInternal_ = function(a) {
    this.state_ == goog.Promise.State_.PENDING && (this.parent_ ? (this.parent_.cancelChild_(this, a), this.parent_ = null) : this.resolve_(goog.Promise.State_.REJECTED, a))
};
goog.Promise.prototype.cancelChild_ = function(a, b) {
    if (this.callbackEntries_) {
        for (var c = 0, d = null, e = null, f = this.callbackEntries_; f && (f.always || (c++, f.child == a && (d = f), !(d && 1 < c))); f = f.next) d || (e = f);
        d && (this.state_ == goog.Promise.State_.PENDING && 1 == c ? this.cancelInternal_(b) : (e ? this.removeEntryAfter_(e) : this.popEntry_(), this.executeCallback_(d, goog.Promise.State_.REJECTED, b)))
    }
};
goog.Promise.prototype.addCallbackEntry_ = function(a) {
    this.hasEntry_() || this.state_ != goog.Promise.State_.FULFILLED && this.state_ != goog.Promise.State_.REJECTED || this.scheduleCallbacks_();
    this.queueEntry_(a)
};
goog.Promise.prototype.addChildPromise_ = function(a, b, c) {
    var d = goog.Promise.getCallbackEntry_(null, null, null);
    d.child = new goog.Promise(function(e, f) {
        d.onFulfilled = a ? function(b) {
            try {
                var d = a.call(c, b);
                e(d)
            } catch (k) {
                f(k)
            }
        } : e;
        d.onRejected = b ? function(a) {
            try {
                var d = b.call(c, a);
                !goog.isDef(d) && a instanceof goog.Promise.CancellationError ? f(a) : e(d)
            } catch (k) {
                f(k)
            }
        } : f
    });
    d.child.parent_ = this;
    this.addCallbackEntry_(d);
    return d.child
};
goog.Promise.prototype.unblockAndFulfill_ = function(a) {
    goog.asserts.assert(this.state_ == goog.Promise.State_.BLOCKED);
    this.state_ = goog.Promise.State_.PENDING;
    this.resolve_(goog.Promise.State_.FULFILLED, a)
};
goog.Promise.prototype.unblockAndReject_ = function(a) {
    goog.asserts.assert(this.state_ == goog.Promise.State_.BLOCKED);
    this.state_ = goog.Promise.State_.PENDING;
    this.resolve_(goog.Promise.State_.REJECTED, a)
};
goog.Promise.prototype.resolve_ = function(a, b) {
    this.state_ == goog.Promise.State_.PENDING && (this == b && (a = goog.Promise.State_.REJECTED, b = new TypeError("Promise cannot resolve to itself")), this.state_ = goog.Promise.State_.BLOCKED, goog.Promise.maybeThen_(b, this.unblockAndFulfill_, this.unblockAndReject_, this) || (this.result_ = b, this.state_ = a, this.parent_ = null, this.scheduleCallbacks_(), a != goog.Promise.State_.REJECTED || b instanceof goog.Promise.CancellationError || goog.Promise.addUnhandledRejection_(this, b)))
};
goog.Promise.maybeThen_ = function(a, b, c, d) {
    if (a instanceof goog.Promise) return a.thenVoid(b, c, d), !0;
    if (goog.Thenable.isImplementedBy(a)) return a.then(b, c, d), !0;
    if (goog.isObject(a)) try {
        var e = a.then;
        if (goog.isFunction(e)) return goog.Promise.tryThen_(a, e, b, c, d), !0
    } catch (f) {
        return c.call(d, f), !0
    }
    return !1
};
goog.Promise.tryThen_ = function(a, b, c, d, e) {
    var f = !1,
        g = function(a) {
            f || (f = !0, c.call(e, a))
        },
        h = function(a) {
            f || (f = !0, d.call(e, a))
        };
    try {
        b.call(a, g, h)
    } catch (k) {
        h(k)
    }
};
goog.Promise.prototype.scheduleCallbacks_ = function() {
    this.executing_ || (this.executing_ = !0, goog.async.run(this.executeCallbacks_, this))
};
goog.Promise.prototype.hasEntry_ = function() {
    return !!this.callbackEntries_
};
goog.Promise.prototype.queueEntry_ = function(a) {
    goog.asserts.assert(null != a.onFulfilled);
    this.callbackEntriesTail_ ? this.callbackEntriesTail_.next = a : this.callbackEntries_ = a;
    this.callbackEntriesTail_ = a
};
goog.Promise.prototype.popEntry_ = function() {
    var a = null;
    this.callbackEntries_ && (a = this.callbackEntries_, this.callbackEntries_ = a.next, a.next = null);
    this.callbackEntries_ || (this.callbackEntriesTail_ = null);
    null != a && goog.asserts.assert(null != a.onFulfilled);
    return a
};
goog.Promise.prototype.removeEntryAfter_ = function(a) {
    goog.asserts.assert(this.callbackEntries_);
    goog.asserts.assert(null != a);
    a.next == this.callbackEntriesTail_ && (this.callbackEntriesTail_ = a);
    a.next = a.next.next
};
goog.Promise.prototype.executeCallbacks_ = function() {
    for (var a = null; a = this.popEntry_();) goog.Promise.LONG_STACK_TRACES && this.currentStep_++, this.executeCallback_(a, this.state_, this.result_);
    this.executing_ = !1
};
goog.Promise.prototype.executeCallback_ = function(a, b, c) {
    b == goog.Promise.State_.REJECTED && a.onRejected && !a.always && this.removeUnhandledRejection_();
    if (a.child) a.child.parent_ = null, goog.Promise.invokeCallback_(a, b, c);
    else try {
        a.always ? a.onFulfilled.call(a.context) : goog.Promise.invokeCallback_(a, b, c)
    } catch (d) {
        goog.Promise.handleRejection_.call(null, d)
    }
    goog.Promise.returnEntry_(a)
};
goog.Promise.invokeCallback_ = function(a, b, c) {
    b == goog.Promise.State_.FULFILLED ? a.onFulfilled.call(a.context, c) : a.onRejected && a.onRejected.call(a.context, c)
};
goog.Promise.prototype.addStackTrace_ = function(a) {
    if (goog.Promise.LONG_STACK_TRACES && goog.isString(a.stack)) {
        var b = a.stack.split("\n", 4)[3];
        a = a.message;
        a += Array(11 - a.length).join(" ");
        this.stack_.push(a + b)
    }
};
goog.Promise.prototype.appendLongStack_ = function(a) {
    if (goog.Promise.LONG_STACK_TRACES && a && goog.isString(a.stack) && this.stack_.length) {
        for (var b = ["Promise trace:"], c = this; c; c = c.parent_) {
            for (var d = this.currentStep_; 0 <= d; d--) b.push(c.stack_[d]);
            b.push("Value: [" + (c.state_ == goog.Promise.State_.REJECTED ? "REJECTED" : "FULFILLED") + "] <" + String(c.result_) + ">")
        }
        a.stack += "\n\n" + b.join("\n")
    }
};
goog.Promise.prototype.removeUnhandledRejection_ = function() {
    if (0 < goog.Promise.UNHANDLED_REJECTION_DELAY)
        for (var a = this; a && a.unhandledRejectionId_; a = a.parent_) goog.global.clearTimeout(a.unhandledRejectionId_), a.unhandledRejectionId_ = 0;
    else if (0 == goog.Promise.UNHANDLED_REJECTION_DELAY)
        for (a = this; a && a.hadUnhandledRejection_; a = a.parent_) a.hadUnhandledRejection_ = !1
};
goog.Promise.addUnhandledRejection_ = function(a, b) {
    0 < goog.Promise.UNHANDLED_REJECTION_DELAY ? a.unhandledRejectionId_ = goog.global.setTimeout(function() {
        a.appendLongStack_(b);
        goog.Promise.handleRejection_.call(null, b)
    }, goog.Promise.UNHANDLED_REJECTION_DELAY) : 0 == goog.Promise.UNHANDLED_REJECTION_DELAY && (a.hadUnhandledRejection_ = !0, goog.async.run(function() {
        a.hadUnhandledRejection_ && (a.appendLongStack_(b), goog.Promise.handleRejection_.call(null, b))
    }))
};
goog.Promise.handleRejection_ = goog.async.throwException;
goog.Promise.setUnhandledRejectionHandler = function(a) {
    goog.Promise.handleRejection_ = a
};
goog.Promise.CancellationError = function(a) {
    goog.debug.Error.call(this, a)
};
goog.inherits(goog.Promise.CancellationError, goog.debug.Error);
goog.Promise.CancellationError.prototype.name = "cancel";
goog.Promise.Resolver_ = function(a, b, c) {
    this.promise = a;
    this.resolve = b;
    this.reject = c
};
goog.i18n = {};
goog.i18n.bidi = {};
goog.i18n.bidi.FORCE_RTL = !1;
goog.i18n.bidi.IS_RTL = goog.i18n.bidi.FORCE_RTL || ("ar" == goog.LOCALE.substring(0, 2).toLowerCase() || "fa" == goog.LOCALE.substring(0, 2).toLowerCase() || "he" == goog.LOCALE.substring(0, 2).toLowerCase() || "iw" == goog.LOCALE.substring(0, 2).toLowerCase() || "ps" == goog.LOCALE.substring(0, 2).toLowerCase() || "sd" == goog.LOCALE.substring(0, 2).toLowerCase() || "ug" == goog.LOCALE.substring(0, 2).toLowerCase() || "ur" == goog.LOCALE.substring(0, 2).toLowerCase() || "yi" == goog.LOCALE.substring(0, 2).toLowerCase()) && (2 == goog.LOCALE.length ||
    "-" == goog.LOCALE.substring(2, 3) || "_" == goog.LOCALE.substring(2, 3)) || 3 <= goog.LOCALE.length && "ckb" == goog.LOCALE.substring(0, 3).toLowerCase() && (3 == goog.LOCALE.length || "-" == goog.LOCALE.substring(3, 4) || "_" == goog.LOCALE.substring(3, 4));
goog.i18n.bidi.Format = {
    LRE: "\u202a",
    RLE: "\u202b",
    PDF: "\u202c",
    LRM: "\u200e",
    RLM: "\u200f"
};
goog.i18n.bidi.Dir = {
    LTR: 1,
    RTL: -1,
    NEUTRAL: 0
};
goog.i18n.bidi.RIGHT = "right";
goog.i18n.bidi.LEFT = "left";
goog.i18n.bidi.I18N_RIGHT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.LEFT : goog.i18n.bidi.RIGHT;
goog.i18n.bidi.I18N_LEFT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT;
goog.i18n.bidi.toDir = function(a, b) {
    return "number" == typeof a ? 0 < a ? goog.i18n.bidi.Dir.LTR : 0 > a ? goog.i18n.bidi.Dir.RTL : b ? null : goog.i18n.bidi.Dir.NEUTRAL : null == a ? null : a ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR
};
goog.i18n.bidi.ltrChars_ = "A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u200e\u2c00-\ufb1c\ufe00-\ufe6f\ufefd-\uffff";
goog.i18n.bidi.rtlChars_ = "\u0591-\u06ef\u06fa-\u07ff\u200f\ufb1d-\ufdff\ufe70-\ufefc";
goog.i18n.bidi.htmlSkipReg_ = /<[^>]*>|&[^;]+;/g;
goog.i18n.bidi.stripHtmlIfNeeded_ = function(a, b) {
    return b ? a.replace(goog.i18n.bidi.htmlSkipReg_, "") : a
};
goog.i18n.bidi.rtlCharReg_ = new RegExp("[" + goog.i18n.bidi.rtlChars_ + "]");
goog.i18n.bidi.ltrCharReg_ = new RegExp("[" + goog.i18n.bidi.ltrChars_ + "]");
goog.i18n.bidi.hasAnyRtl = function(a, b) {
    return goog.i18n.bidi.rtlCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
};
goog.i18n.bidi.hasRtlChar = goog.i18n.bidi.hasAnyRtl;
goog.i18n.bidi.hasAnyLtr = function(a, b) {
    return goog.i18n.bidi.ltrCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
};
goog.i18n.bidi.ltrRe_ = new RegExp("^[" + goog.i18n.bidi.ltrChars_ + "]");
goog.i18n.bidi.rtlRe_ = new RegExp("^[" + goog.i18n.bidi.rtlChars_ + "]");
goog.i18n.bidi.isRtlChar = function(a) {
    return goog.i18n.bidi.rtlRe_.test(a)
};
goog.i18n.bidi.isLtrChar = function(a) {
    return goog.i18n.bidi.ltrRe_.test(a)
};
goog.i18n.bidi.isNeutralChar = function(a) {
    return !goog.i18n.bidi.isLtrChar(a) && !goog.i18n.bidi.isRtlChar(a)
};
goog.i18n.bidi.ltrDirCheckRe_ = new RegExp("^[^" + goog.i18n.bidi.rtlChars_ + "]*[" + goog.i18n.bidi.ltrChars_ + "]");
goog.i18n.bidi.rtlDirCheckRe_ = new RegExp("^[^" + goog.i18n.bidi.ltrChars_ + "]*[" + goog.i18n.bidi.rtlChars_ + "]");
goog.i18n.bidi.startsWithRtl = function(a, b) {
    return goog.i18n.bidi.rtlDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
};
goog.i18n.bidi.isRtlText = goog.i18n.bidi.startsWithRtl;
goog.i18n.bidi.startsWithLtr = function(a, b) {
    return goog.i18n.bidi.ltrDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
};
goog.i18n.bidi.isLtrText = goog.i18n.bidi.startsWithLtr;
goog.i18n.bidi.isRequiredLtrRe_ = /^http:\/\/.*/;
goog.i18n.bidi.isNeutralText = function(a, b) {
    a = goog.i18n.bidi.stripHtmlIfNeeded_(a, b);
    return goog.i18n.bidi.isRequiredLtrRe_.test(a) || !goog.i18n.bidi.hasAnyLtr(a) && !goog.i18n.bidi.hasAnyRtl(a)
};
goog.i18n.bidi.ltrExitDirCheckRe_ = new RegExp("[" + goog.i18n.bidi.ltrChars_ + "][^" + goog.i18n.bidi.rtlChars_ + "]*$");
goog.i18n.bidi.rtlExitDirCheckRe_ = new RegExp("[" + goog.i18n.bidi.rtlChars_ + "][^" + goog.i18n.bidi.ltrChars_ + "]*$");
goog.i18n.bidi.endsWithLtr = function(a, b) {
    return goog.i18n.bidi.ltrExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
};
goog.i18n.bidi.isLtrExitText = goog.i18n.bidi.endsWithLtr;
goog.i18n.bidi.endsWithRtl = function(a, b) {
    return goog.i18n.bidi.rtlExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
};
goog.i18n.bidi.isRtlExitText = goog.i18n.bidi.endsWithRtl;
goog.i18n.bidi.rtlLocalesRe_ = /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Arab|Hebr|Thaa|Nkoo|Tfng))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
goog.i18n.bidi.isRtlLanguage = function(a) {
    return goog.i18n.bidi.rtlLocalesRe_.test(a)
};
goog.i18n.bidi.bracketGuardTextRe_ = /(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(<.*?>+)/g;
goog.i18n.bidi.guardBracketInText = function(a, b) {
    var c = (void 0 === b ? goog.i18n.bidi.hasAnyRtl(a) : b) ? goog.i18n.bidi.Format.RLM : goog.i18n.bidi.Format.LRM;
    return a.replace(goog.i18n.bidi.bracketGuardTextRe_, c + "$&" + c)
};
goog.i18n.bidi.enforceRtlInHtml = function(a) {
    return "<" == a.charAt(0) ? a.replace(/<\w+/, "$& dir=rtl") : "\n<span dir=rtl>" + a + "</span>"
};
goog.i18n.bidi.enforceRtlInText = function(a) {
    return goog.i18n.bidi.Format.RLE + a + goog.i18n.bidi.Format.PDF
};
goog.i18n.bidi.enforceLtrInHtml = function(a) {
    return "<" == a.charAt(0) ? a.replace(/<\w+/, "$& dir=ltr") : "\n<span dir=ltr>" + a + "</span>"
};
goog.i18n.bidi.enforceLtrInText = function(a) {
    return goog.i18n.bidi.Format.LRE + a + goog.i18n.bidi.Format.PDF
};
goog.i18n.bidi.dimensionsRe_ = /:\s*([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)/g;
goog.i18n.bidi.leftRe_ = /left/gi;
goog.i18n.bidi.rightRe_ = /right/gi;
goog.i18n.bidi.tempRe_ = /%%%%/g;
goog.i18n.bidi.mirrorCSS = function(a) {
    return a.replace(goog.i18n.bidi.dimensionsRe_, ":$1 $4 $3 $2").replace(goog.i18n.bidi.leftRe_, "%%%%").replace(goog.i18n.bidi.rightRe_, goog.i18n.bidi.LEFT).replace(goog.i18n.bidi.tempRe_, goog.i18n.bidi.RIGHT)
};
goog.i18n.bidi.doubleQuoteSubstituteRe_ = /([\u0591-\u05f2])"/g;
goog.i18n.bidi.singleQuoteSubstituteRe_ = /([\u0591-\u05f2])'/g;
goog.i18n.bidi.normalizeHebrewQuote = function(a) {
    return a.replace(goog.i18n.bidi.doubleQuoteSubstituteRe_, "$1\u05f4").replace(goog.i18n.bidi.singleQuoteSubstituteRe_, "$1\u05f3")
};
goog.i18n.bidi.wordSeparatorRe_ = /\s+/;
goog.i18n.bidi.hasNumeralsRe_ = /[\d\u06f0-\u06f9]/;
goog.i18n.bidi.rtlDetectionThreshold_ = .4;
goog.i18n.bidi.estimateDirection = function(a, b) {
    for (var c = 0, d = 0, e = !1, f = goog.i18n.bidi.stripHtmlIfNeeded_(a, b).split(goog.i18n.bidi.wordSeparatorRe_), g = 0; g < f.length; g++) {
        var h = f[g];
        goog.i18n.bidi.startsWithRtl(h) ? (c++, d++) : goog.i18n.bidi.isRequiredLtrRe_.test(h) ? e = !0 : goog.i18n.bidi.hasAnyLtr(h) ? d++ : goog.i18n.bidi.hasNumeralsRe_.test(h) && (e = !0)
    }
    return 0 == d ? e ? goog.i18n.bidi.Dir.LTR : goog.i18n.bidi.Dir.NEUTRAL : c / d > goog.i18n.bidi.rtlDetectionThreshold_ ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR
};
goog.i18n.bidi.detectRtlDirectionality = function(a, b) {
    return goog.i18n.bidi.estimateDirection(a, b) == goog.i18n.bidi.Dir.RTL
};
goog.i18n.bidi.setElementDirAndAlign = function(a, b) {
    a && (b = goog.i18n.bidi.toDir(b)) && (a.style.textAlign = b == goog.i18n.bidi.Dir.RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT, a.dir = b == goog.i18n.bidi.Dir.RTL ? "rtl" : "ltr")
};
goog.i18n.bidi.setElementDirByTextDirectionality = function(a, b) {
    switch (goog.i18n.bidi.estimateDirection(b)) {
        case goog.i18n.bidi.Dir.LTR:
            a.dir = "ltr";
            break;
        case goog.i18n.bidi.Dir.RTL:
            a.dir = "rtl";
            break;
        default:
            a.removeAttribute("dir")
    }
};
goog.i18n.bidi.DirectionalString = function() {};
goog.fs = {};
goog.fs.url = {};
goog.fs.url.createObjectUrl = function(a) {
    return goog.fs.url.getUrlObject_().createObjectURL(a)
};
goog.fs.url.revokeObjectUrl = function(a) {
    goog.fs.url.getUrlObject_().revokeObjectURL(a)
};
goog.fs.url.getUrlObject_ = function() {
    var a = goog.fs.url.findUrlObject_();
    if (null != a) return a;
    throw Error("This browser doesn't seem to support blob URLs");
};
goog.fs.url.findUrlObject_ = function() {
    return goog.isDef(goog.global.URL) && goog.isDef(goog.global.URL.createObjectURL) ? goog.global.URL : goog.isDef(goog.global.webkitURL) && goog.isDef(goog.global.webkitURL.createObjectURL) ? goog.global.webkitURL : goog.isDef(goog.global.createObjectURL) ? goog.global : null
};
goog.fs.url.browserSupportsObjectUrls = function() {
    return null != goog.fs.url.findUrlObject_()
};
goog.string.TypedString = function() {};
goog.string.Const = function() {
    this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = "";
    this.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ = goog.string.Const.TYPE_MARKER_
};
goog.string.Const.prototype.implementsGoogStringTypedString = !0;
goog.string.Const.prototype.getTypedStringValue = function() {
    return this.stringConstValueWithSecurityContract__googStringSecurityPrivate_
};
goog.string.Const.prototype.toString = function() {
    return "Const{" + this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ + "}"
};
goog.string.Const.unwrap = function(a) {
    if (a instanceof goog.string.Const && a.constructor === goog.string.Const && a.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ === goog.string.Const.TYPE_MARKER_) return a.stringConstValueWithSecurityContract__googStringSecurityPrivate_;
    goog.asserts.fail("expected object of type Const, got '" + a + "'");
    return "type_error:Const"
};
goog.string.Const.from = function(a) {
    return goog.string.Const.create__googStringSecurityPrivate_(a)
};
goog.string.Const.TYPE_MARKER_ = {};
goog.string.Const.create__googStringSecurityPrivate_ = function(a) {
    var b = new goog.string.Const;
    b.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = a;
    return b
};
goog.html = {};
goog.html.SafeUrl = function() {
    this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = "";
    this.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
};
goog.html.SafeUrl.INNOCUOUS_STRING = "about:invalid#zClosurez";
goog.html.SafeUrl.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeUrl.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_
};
goog.html.SafeUrl.prototype.implementsGoogI18nBidiDirectionalString = !0;
goog.html.SafeUrl.prototype.getDirection = function() {
    return goog.i18n.bidi.Dir.LTR
};
goog.DEBUG && (goog.html.SafeUrl.prototype.toString = function() {
    return "SafeUrl{" + this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ + "}"
});
goog.html.SafeUrl.unwrap = function(a) {
    if (a instanceof goog.html.SafeUrl && a.constructor === goog.html.SafeUrl && a.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
    goog.asserts.fail("expected object of type SafeUrl, got '" + a + "'");
    return "type_error:SafeUrl"
};
goog.html.SafeUrl.fromConstant = function(a) {
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(a))
};
goog.html.SAFE_MIME_TYPE_PATTERN_ = /^(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm))$/i;
goog.html.SafeUrl.fromBlob = function(a) {
    a = goog.html.SAFE_MIME_TYPE_PATTERN_.test(a.type) ? goog.fs.url.createObjectUrl(a) : goog.html.SafeUrl.INNOCUOUS_STRING;
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
};
goog.html.DATA_URL_PATTERN_ = /^data:([^;,]*);base64,[a-z0-9+\/]+=*$/i;
goog.html.SafeUrl.fromDataUrl = function(a) {
    var b = a.match(goog.html.DATA_URL_PATTERN_),
        b = b && goog.html.SAFE_MIME_TYPE_PATTERN_.test(b[1]);
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(b ? a : goog.html.SafeUrl.INNOCUOUS_STRING)
};
goog.html.SAFE_URL_PATTERN_ = /^(?:(?:https?|mailto|ftp):|[^&:/?#]*(?:[/?#]|$))/i;
goog.html.SafeUrl.sanitize = function(a) {
    if (a instanceof goog.html.SafeUrl) return a;
    a = a.implementsGoogStringTypedString ? a.getTypedStringValue() : String(a);
    goog.html.SAFE_URL_PATTERN_.test(a) || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
};
goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse = function(a) {
    var b = new goog.html.SafeUrl;
    b.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = a;
    return b
};
goog.html.SafeStyle = function() {
    this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = "";
    this.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
};
goog.html.SafeStyle.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeStyle.fromConstant = function(a) {
    a = goog.string.Const.unwrap(a);
    if (0 === a.length) return goog.html.SafeStyle.EMPTY;
    goog.html.SafeStyle.checkStyle_(a);
    goog.asserts.assert(goog.string.endsWith(a, ";"), "Last character of style string is not ';': " + a);
    goog.asserts.assert(goog.string.contains(a, ":"), "Style string must contain at least one ':', to specify a \"name: value\" pair: " + a);
    return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(a)
};
goog.html.SafeStyle.checkStyle_ = function(a) {
    goog.asserts.assert(!/[<>]/.test(a), "Forbidden characters in style string: " + a)
};
goog.html.SafeStyle.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseSafeStyleWrappedValue_
};
goog.DEBUG && (goog.html.SafeStyle.prototype.toString = function() {
    return "SafeStyle{" + this.privateDoNotAccessOrElseSafeStyleWrappedValue_ + "}"
});
goog.html.SafeStyle.unwrap = function(a) {
    if (a instanceof goog.html.SafeStyle && a.constructor === goog.html.SafeStyle && a.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseSafeStyleWrappedValue_;
    goog.asserts.fail("expected object of type SafeStyle, got '" + a + "'");
    return "type_error:SafeStyle"
};
goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse = function(a) {
    return (new goog.html.SafeStyle).initSecurityPrivateDoNotAccessOrElse_(a)
};
goog.html.SafeStyle.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a) {
    this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = a;
    return this
};
goog.html.SafeStyle.EMPTY = goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse("");
goog.html.SafeStyle.INNOCUOUS_STRING = "zClosurez";
goog.html.SafeStyle.create = function(a) {
    var b = "",
        c;
    for (c in a) {
        if (!/^[-_a-zA-Z0-9]+$/.test(c)) throw Error("Name allows only [-_a-zA-Z0-9], got: " + c);
        var d = a[c];
        null != d && (d instanceof goog.string.Const ? (d = goog.string.Const.unwrap(d), goog.asserts.assert(!/[{;}]/.test(d), "Value does not allow [{;}].")) : goog.html.SafeStyle.VALUE_RE_.test(d) ? goog.html.SafeStyle.hasBalancedQuotes_(d) || (goog.asserts.fail("String value requires balanced quotes, got: " + d), d = goog.html.SafeStyle.INNOCUOUS_STRING) : (goog.asserts.fail("String value allows only [-,.\"'%_!# a-zA-Z0-9], rgb() and rgba(), got: " +
            d), d = goog.html.SafeStyle.INNOCUOUS_STRING), b += c + ":" + d + ";")
    }
    if (!b) return goog.html.SafeStyle.EMPTY;
    goog.html.SafeStyle.checkStyle_(b);
    return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b)
};
goog.html.SafeStyle.hasBalancedQuotes_ = function(a) {
    for (var b = !0, c = !0, d = 0; d < a.length; d++) {
        var e = a.charAt(d);
        "'" == e && c ? b = !b : '"' == e && b && (c = !c)
    }
    return b && c
};
goog.html.SafeStyle.VALUE_RE_ = /^([-,."'%_!# a-zA-Z0-9]+|(?:rgb|hsl)a?\([0-9.%, ]+\))$/;
goog.html.SafeStyle.concat = function(a) {
    var b = "",
        c = function(a) {
            goog.isArray(a) ? goog.array.forEach(a, c) : b += goog.html.SafeStyle.unwrap(a)
        };
    goog.array.forEach(arguments, c);
    return b ? goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b) : goog.html.SafeStyle.EMPTY
};
goog.html.SafeStyleSheet = function() {
    this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = "";
    this.SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
};
goog.html.SafeStyleSheet.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeStyleSheet.concat = function(a) {
    var b = "",
        c = function(a) {
            goog.isArray(a) ? goog.array.forEach(a, c) : b += goog.html.SafeStyleSheet.unwrap(a)
        };
    goog.array.forEach(arguments, c);
    return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(b)
};
goog.html.SafeStyleSheet.fromConstant = function(a) {
    a = goog.string.Const.unwrap(a);
    if (0 === a.length) return goog.html.SafeStyleSheet.EMPTY;
    goog.asserts.assert(!goog.string.contains(a, "<"), "Forbidden '<' character in style sheet string: " + a);
    return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(a)
};
goog.html.SafeStyleSheet.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_
};
goog.DEBUG && (goog.html.SafeStyleSheet.prototype.toString = function() {
    return "SafeStyleSheet{" + this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ + "}"
});
goog.html.SafeStyleSheet.unwrap = function(a) {
    if (a instanceof goog.html.SafeStyleSheet && a.constructor === goog.html.SafeStyleSheet && a.SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_;
    goog.asserts.fail("expected object of type SafeStyleSheet, got '" + a + "'");
    return "type_error:SafeStyleSheet"
};
goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse = function(a) {
    return (new goog.html.SafeStyleSheet).initSecurityPrivateDoNotAccessOrElse_(a)
};
goog.html.SafeStyleSheet.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a) {
    this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = a;
    return this
};
goog.html.SafeStyleSheet.EMPTY = goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse("");
goog.html.TrustedResourceUrl = function() {
    this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = "";
    this.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
};
goog.html.TrustedResourceUrl.prototype.implementsGoogStringTypedString = !0;
goog.html.TrustedResourceUrl.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_
};
goog.html.TrustedResourceUrl.prototype.implementsGoogI18nBidiDirectionalString = !0;
goog.html.TrustedResourceUrl.prototype.getDirection = function() {
    return goog.i18n.bidi.Dir.LTR
};
goog.DEBUG && (goog.html.TrustedResourceUrl.prototype.toString = function() {
    return "TrustedResourceUrl{" + this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ + "}"
});
goog.html.TrustedResourceUrl.unwrap = function(a) {
    if (a instanceof goog.html.TrustedResourceUrl && a.constructor === goog.html.TrustedResourceUrl && a.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_;
    goog.asserts.fail("expected object of type TrustedResourceUrl, got '" + a + "'");
    return "type_error:TrustedResourceUrl"
};
goog.html.TrustedResourceUrl.fromConstant = function(a) {
    return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(a))
};
goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse = function(a) {
    var b = new goog.html.TrustedResourceUrl;
    b.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = a;
    return b
};
goog.dom.tags = {};
goog.dom.tags.VOID_TAGS_ = {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    command: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
};
goog.dom.tags.isVoidTag = function(a) {
    return !0 === goog.dom.tags.VOID_TAGS_[a]
};
goog.html.SafeHtml = function() {
    this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = "";
    this.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
    this.dir_ = null
};
goog.html.SafeHtml.prototype.implementsGoogI18nBidiDirectionalString = !0;
goog.html.SafeHtml.prototype.getDirection = function() {
    return this.dir_
};
goog.html.SafeHtml.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeHtml.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_
};
goog.DEBUG && (goog.html.SafeHtml.prototype.toString = function() {
    return "SafeHtml{" + this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ + "}"
});
goog.html.SafeHtml.unwrap = function(a) {
    if (a instanceof goog.html.SafeHtml && a.constructor === goog.html.SafeHtml && a.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
    goog.asserts.fail("expected object of type SafeHtml, got '" + a + "'");
    return "type_error:SafeHtml"
};
goog.html.SafeHtml.htmlEscape = function(a) {
    if (a instanceof goog.html.SafeHtml) return a;
    var b = null;
    a.implementsGoogI18nBidiDirectionalString && (b = a.getDirection());
    a = a.implementsGoogStringTypedString ? a.getTypedStringValue() : String(a);
    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.htmlEscape(a), b)
};
goog.html.SafeHtml.htmlEscapePreservingNewlines = function(a) {
    if (a instanceof goog.html.SafeHtml) return a;
    a = goog.html.SafeHtml.htmlEscape(a);
    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.newLineToBr(goog.html.SafeHtml.unwrap(a)), a.getDirection())
};
goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces = function(a) {
    if (a instanceof goog.html.SafeHtml) return a;
    a = goog.html.SafeHtml.htmlEscape(a);
    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.whitespaceEscape(goog.html.SafeHtml.unwrap(a)), a.getDirection())
};
goog.html.SafeHtml.from = goog.html.SafeHtml.htmlEscape;
goog.html.SafeHtml.VALID_NAMES_IN_TAG_ = /^[a-zA-Z0-9-]+$/;
goog.html.SafeHtml.URL_ATTRIBUTES_ = {
    action: !0,
    cite: !0,
    data: !0,
    formaction: !0,
    href: !0,
    manifest: !0,
    poster: !0,
    src: !0
};
goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_ = goog.object.createSet(goog.dom.TagName.APPLET, goog.dom.TagName.BASE, goog.dom.TagName.EMBED, goog.dom.TagName.IFRAME, goog.dom.TagName.LINK, goog.dom.TagName.MATH, goog.dom.TagName.OBJECT, goog.dom.TagName.SCRIPT, goog.dom.TagName.STYLE, goog.dom.TagName.SVG, goog.dom.TagName.TEMPLATE);
goog.html.SafeHtml.create = function(a, b, c) {
    if (!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(a)) throw Error("Invalid tag name <" + a + ">.");
    if (a.toUpperCase() in goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_) throw Error("Tag name <" + a + "> is not allowed for SafeHtml.");
    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse(a, b, c)
};
goog.html.SafeHtml.createIframe = function(a, b, c, d) {
    var e = {};
    e.src = a || null;
    e.srcdoc = b || null;
    a = goog.html.SafeHtml.combineAttributes(e, {
        sandbox: ""
    }, c);
    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("iframe", a, d)
};
goog.html.SafeHtml.createStyle = function(a, b) {
    var c = goog.html.SafeHtml.combineAttributes({
            type: "text/css"
        }, {}, b),
        d = "";
    a = goog.array.concat(a);
    for (var e = 0; e < a.length; e++) d += goog.html.SafeStyleSheet.unwrap(a[e]);
    d = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(d, goog.i18n.bidi.Dir.NEUTRAL);
    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("style", c, d)
};
goog.html.SafeHtml.createMetaRefresh = function(a, b) {
    var c = goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitize(a));
    (goog.labs.userAgent.browser.isIE() || goog.labs.userAgent.browser.isEdge()) && goog.string.contains(c, ";") && (c = "'" + c.replace(/'/g, "%27") + "'");
    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("meta", {
        "http-equiv": "refresh",
        content: (b || 0) + "; url=" + c
    })
};
goog.html.SafeHtml.getAttrNameAndValue_ = function(a, b, c) {
    if (c instanceof goog.string.Const) c = goog.string.Const.unwrap(c);
    else if ("style" == b.toLowerCase()) c = goog.html.SafeHtml.getStyleValue_(c);
    else {
        if (/^on/i.test(b)) throw Error('Attribute "' + b + '" requires goog.string.Const value, "' + c + '" given.');
        if (b.toLowerCase() in goog.html.SafeHtml.URL_ATTRIBUTES_)
            if (c instanceof goog.html.TrustedResourceUrl) c = goog.html.TrustedResourceUrl.unwrap(c);
            else if (c instanceof goog.html.SafeUrl) c = goog.html.SafeUrl.unwrap(c);
        else if (goog.isString(c)) c = goog.html.SafeUrl.sanitize(c).getTypedStringValue();
        else throw Error('Attribute "' + b + '" on tag "' + a + '" requires goog.html.SafeUrl, goog.string.Const, or string, value "' + c + '" given.');
    }
    c.implementsGoogStringTypedString && (c = c.getTypedStringValue());
    goog.asserts.assert(goog.isString(c) || goog.isNumber(c), "String or number value expected, got " + typeof c + " with value: " + c);
    return b + '="' + goog.string.htmlEscape(String(c)) + '"'
};
goog.html.SafeHtml.getStyleValue_ = function(a) {
    if (!goog.isObject(a)) throw Error('The "style" attribute requires goog.html.SafeStyle or map of style properties, ' + typeof a + " given: " + a);
    a instanceof goog.html.SafeStyle || (a = goog.html.SafeStyle.create(a));
    return goog.html.SafeStyle.unwrap(a)
};
goog.html.SafeHtml.createWithDir = function(a, b, c, d) {
    b = goog.html.SafeHtml.create(b, c, d);
    b.dir_ = a;
    return b
};
goog.html.SafeHtml.concat = function(a) {
    var b = goog.i18n.bidi.Dir.NEUTRAL,
        c = "",
        d = function(a) {
            goog.isArray(a) ? goog.array.forEach(a, d) : (a = goog.html.SafeHtml.htmlEscape(a), c += goog.html.SafeHtml.unwrap(a), a = a.getDirection(), b == goog.i18n.bidi.Dir.NEUTRAL ? b = a : a != goog.i18n.bidi.Dir.NEUTRAL && b != a && (b = null))
        };
    goog.array.forEach(arguments, d);
    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(c, b)
};
goog.html.SafeHtml.concatWithDir = function(a, b) {
    var c = goog.html.SafeHtml.concat(goog.array.slice(arguments, 1));
    c.dir_ = a;
    return c
};
goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse = function(a, b) {
    return (new goog.html.SafeHtml).initSecurityPrivateDoNotAccessOrElse_(a, b)
};
goog.html.SafeHtml.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a, b) {
    this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = a;
    this.dir_ = b;
    return this
};
goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse = function(a, b, c) {
    var d = null,
        e = "<" + a;
    if (b)
        for (var f in b) {
            if (!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(f)) throw Error('Invalid attribute name "' + f + '".');
            var g = b[f];
            goog.isDefAndNotNull(g) && (e += " " + goog.html.SafeHtml.getAttrNameAndValue_(a, f, g))
        }
    goog.isDefAndNotNull(c) ? goog.isArray(c) || (c = [c]) : c = [];
    goog.dom.tags.isVoidTag(a.toLowerCase()) ? (goog.asserts.assert(!c.length, "Void tag <" + a + "> does not allow content."), e += ">") : (d = goog.html.SafeHtml.concat(c),
        e += ">" + goog.html.SafeHtml.unwrap(d) + "</" + a + ">", d = d.getDirection());
    (a = b && b.dir) && (d = /^(ltr|rtl|auto)$/i.test(a) ? goog.i18n.bidi.Dir.NEUTRAL : null);
    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(e, d)
};
goog.html.SafeHtml.combineAttributes = function(a, b, c) {
    var d = {},
        e;
    for (e in a) goog.asserts.assert(e.toLowerCase() == e, "Must be lower case"), d[e] = a[e];
    for (e in b) goog.asserts.assert(e.toLowerCase() == e, "Must be lower case"), d[e] = b[e];
    for (e in c) {
        var f = e.toLowerCase();
        if (f in a) throw Error('Cannot override "' + f + '" attribute, got "' + e + '" with value "' + c[e] + '"');
        f in b && delete d[f];
        d[e] = c[e]
    }
    return d
};
goog.html.SafeHtml.DOCTYPE_HTML = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("<!DOCTYPE html>", goog.i18n.bidi.Dir.NEUTRAL);
goog.html.SafeHtml.EMPTY = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("", goog.i18n.bidi.Dir.NEUTRAL);
goog.dom.safe = {};
goog.dom.safe.InsertAdjacentHtmlPosition = {
    AFTERBEGIN: "afterbegin",
    AFTEREND: "afterend",
    BEFOREBEGIN: "beforebegin",
    BEFOREEND: "beforeend"
};
goog.dom.safe.insertAdjacentHtml = function(a, b, c) {
    a.insertAdjacentHTML(b, goog.html.SafeHtml.unwrap(c))
};
goog.dom.safe.setInnerHtml = function(a, b) {
    a.innerHTML = goog.html.SafeHtml.unwrap(b)
};
goog.dom.safe.setOuterHtml = function(a, b) {
    a.outerHTML = goog.html.SafeHtml.unwrap(b)
};
goog.dom.safe.documentWrite = function(a, b) {
    a.write(goog.html.SafeHtml.unwrap(b))
};
goog.dom.safe.setAnchorHref = function(a, b) {
    var c;
    c = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitize(b);
    a.href = goog.html.SafeUrl.unwrap(c)
};
goog.dom.safe.setImageSrc = function(a, b) {
    var c;
    c = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitize(b);
    a.src = goog.html.SafeUrl.unwrap(c)
};
goog.dom.safe.setEmbedSrc = function(a, b) {
    a.src = goog.html.TrustedResourceUrl.unwrap(b)
};
goog.dom.safe.setFrameSrc = function(a, b) {
    a.src = goog.html.TrustedResourceUrl.unwrap(b)
};
goog.dom.safe.setIframeSrc = function(a, b) {
    a.src = goog.html.TrustedResourceUrl.unwrap(b)
};
goog.dom.safe.setLinkHrefAndRel = function(a, b, c) {
    a.rel = c;
    goog.string.caseInsensitiveContains(c, "stylesheet") ? (goog.asserts.assert(b instanceof goog.html.TrustedResourceUrl, 'URL must be TrustedResourceUrl because "rel" contains "stylesheet"'), a.href = goog.html.TrustedResourceUrl.unwrap(b)) : a.href = b instanceof goog.html.TrustedResourceUrl ? goog.html.TrustedResourceUrl.unwrap(b) : b instanceof goog.html.SafeUrl ? goog.html.SafeUrl.unwrap(b) : goog.html.SafeUrl.sanitize(b).getTypedStringValue()
};
goog.dom.safe.setObjectData = function(a, b) {
    a.data = goog.html.TrustedResourceUrl.unwrap(b)
};
goog.dom.safe.setScriptSrc = function(a, b) {
    a.src = goog.html.TrustedResourceUrl.unwrap(b)
};
goog.dom.safe.setLocationHref = function(a, b) {
    var c;
    c = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitize(b);
    a.href = goog.html.SafeUrl.unwrap(c)
};
goog.dom.safe.openInWindow = function(a, b, c, d, e) {
    a = a instanceof goog.html.SafeUrl ? a : goog.html.SafeUrl.sanitize(a);
    return (b || window).open(goog.html.SafeUrl.unwrap(a), c ? goog.string.Const.unwrap(c) : "", d, e)
};
goog.math = {};
goog.math.Size = function(a, b) {
    this.width = a;
    this.height = b
};
goog.math.Size.equals = function(a, b) {
    return a == b ? !0 : a && b ? a.width == b.width && a.height == b.height : !1
};
goog.math.Size.prototype.clone = function() {
    return new goog.math.Size(this.width, this.height)
};
goog.DEBUG && (goog.math.Size.prototype.toString = function() {
    return "(" + this.width + " x " + this.height + ")"
});
goog.math.Size.prototype.getLongest = function() {
    return Math.max(this.width, this.height)
};
goog.math.Size.prototype.getShortest = function() {
    return Math.min(this.width, this.height)
};
goog.math.Size.prototype.area = function() {
    return this.width * this.height
};
goog.math.Size.prototype.perimeter = function() {
    return 2 * (this.width + this.height)
};
goog.math.Size.prototype.aspectRatio = function() {
    return this.width / this.height
};
goog.math.Size.prototype.isEmpty = function() {
    return !this.area()
};
goog.math.Size.prototype.ceil = function() {
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
    return this
};
goog.math.Size.prototype.fitsInside = function(a) {
    return this.width <= a.width && this.height <= a.height
};
goog.math.Size.prototype.floor = function() {
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    return this
};
goog.math.Size.prototype.round = function() {
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this
};
goog.math.Size.prototype.scale = function(a, b) {
    var c = goog.isNumber(b) ? b : a;
    this.width *= a;
    this.height *= c;
    return this
};
goog.math.Size.prototype.scaleToCover = function(a) {
    a = this.aspectRatio() <= a.aspectRatio() ? a.width / this.width : a.height / this.height;
    return this.scale(a)
};
goog.math.Size.prototype.scaleToFit = function(a) {
    a = this.aspectRatio() > a.aspectRatio() ? a.width / this.width : a.height / this.height;
    return this.scale(a)
};
goog.math.randomInt = function(a) {
    return Math.floor(Math.random() * a)
};
goog.math.uniformRandom = function(a, b) {
    return a + Math.random() * (b - a)
};
goog.math.clamp = function(a, b, c) {
    return Math.min(Math.max(a, b), c)
};
goog.math.modulo = function(a, b) {
    var c = a % b;
    return 0 > c * b ? c + b : c
};
goog.math.lerp = function(a, b, c) {
    return a + c * (b - a)
};
goog.math.nearlyEquals = function(a, b, c) {
    return Math.abs(a - b) <= (c || 1E-6)
};
goog.math.standardAngle = function(a) {
    return goog.math.modulo(a, 360)
};
goog.math.standardAngleInRadians = function(a) {
    return goog.math.modulo(a, 2 * Math.PI)
};
goog.math.toRadians = function(a) {
    return a * Math.PI / 180
};
goog.math.toDegrees = function(a) {
    return 180 * a / Math.PI
};
goog.math.angleDx = function(a, b) {
    return b * Math.cos(goog.math.toRadians(a))
};
goog.math.angleDy = function(a, b) {
    return b * Math.sin(goog.math.toRadians(a))
};
goog.math.angle = function(a, b, c, d) {
    return goog.math.standardAngle(goog.math.toDegrees(Math.atan2(d - b, c - a)))
};
goog.math.angleDifference = function(a, b) {
    var c = goog.math.standardAngle(b) - goog.math.standardAngle(a);
    180 < c ? c -= 360 : -180 >= c && (c = 360 + c);
    return c
};
goog.math.sign = Math.sign || function(a) {
    return 0 < a ? 1 : 0 > a ? -1 : a
};
goog.math.longestCommonSubsequence = function(a, b, c, d) {
    c = c || function(a, b) {
        return a == b
    };
    d = d || function(b, c) {
        return a[b]
    };
    for (var e = a.length, f = b.length, g = [], h = 0; h < e + 1; h++) g[h] = [], g[h][0] = 0;
    for (var k = 0; k < f + 1; k++) g[0][k] = 0;
    for (h = 1; h <= e; h++)
        for (k = 1; k <= f; k++) c(a[h - 1], b[k - 1]) ? g[h][k] = g[h - 1][k - 1] + 1 : g[h][k] = Math.max(g[h - 1][k], g[h][k - 1]);
    for (var l = [], h = e, k = f; 0 < h && 0 < k;) c(a[h - 1], b[k - 1]) ? (l.unshift(d(h - 1, k - 1)), h--, k--) : g[h - 1][k] > g[h][k - 1] ? h-- : k--;
    return l
};
goog.math.sum = function(a) {
    return goog.array.reduce(arguments, function(a, c) {
        return a + c
    }, 0)
};
goog.math.average = function(a) {
    return goog.math.sum.apply(null, arguments) / arguments.length
};
goog.math.sampleVariance = function(a) {
    var b = arguments.length;
    if (2 > b) return 0;
    var c = goog.math.average.apply(null, arguments);
    return goog.math.sum.apply(null, goog.array.map(arguments, function(a) {
        return Math.pow(a - c, 2)
    })) / (b - 1)
};
goog.math.standardDeviation = function(a) {
    return Math.sqrt(goog.math.sampleVariance.apply(null, arguments))
};
goog.math.isInt = function(a) {
    return isFinite(a) && 0 == a % 1
};
goog.math.isFiniteNumber = function(a) {
    return isFinite(a) && !isNaN(a)
};
goog.math.isNegativeZero = function(a) {
    return 0 == a && 0 > 1 / a
};
goog.math.log10Floor = function(a) {
    if (0 < a) {
        var b = Math.round(Math.log(a) * Math.LOG10E);
        return b - (parseFloat("1e" + b) > a ? 1 : 0)
    }
    return 0 == a ? -Infinity : NaN
};
goog.math.safeFloor = function(a, b) {
    goog.asserts.assert(!goog.isDef(b) || 0 < b);
    return Math.floor(a + (b || 2E-15))
};
goog.math.safeCeil = function(a, b) {
    goog.asserts.assert(!goog.isDef(b) || 0 < b);
    return Math.ceil(a - (b || 2E-15))
};
goog.math.Coordinate = function(a, b) {
    this.x = goog.isDef(a) ? a : 0;
    this.y = goog.isDef(b) ? b : 0
};
goog.math.Coordinate.prototype.clone = function() {
    return new goog.math.Coordinate(this.x, this.y)
};
goog.DEBUG && (goog.math.Coordinate.prototype.toString = function() {
    return "(" + this.x + ", " + this.y + ")"
});
goog.math.Coordinate.equals = function(a, b) {
    return a == b ? !0 : a && b ? a.x == b.x && a.y == b.y : !1
};
goog.math.Coordinate.distance = function(a, b) {
    var c = a.x - b.x,
        d = a.y - b.y;
    return Math.sqrt(c * c + d * d)
};
goog.math.Coordinate.magnitude = function(a) {
    return Math.sqrt(a.x * a.x + a.y * a.y)
};
goog.math.Coordinate.azimuth = function(a) {
    return goog.math.angle(0, 0, a.x, a.y)
};
goog.math.Coordinate.squaredDistance = function(a, b) {
    var c = a.x - b.x,
        d = a.y - b.y;
    return c * c + d * d
};
goog.math.Coordinate.difference = function(a, b) {
    return new goog.math.Coordinate(a.x - b.x, a.y - b.y)
};
goog.math.Coordinate.sum = function(a, b) {
    return new goog.math.Coordinate(a.x + b.x, a.y + b.y)
};
goog.math.Coordinate.prototype.ceil = function() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this
};
goog.math.Coordinate.prototype.floor = function() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this
};
goog.math.Coordinate.prototype.round = function() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this
};
goog.math.Coordinate.prototype.translate = function(a, b) {
    a instanceof goog.math.Coordinate ? (this.x += a.x, this.y += a.y) : (this.x += a, goog.isNumber(b) && (this.y += b));
    return this
};
goog.math.Coordinate.prototype.scale = function(a, b) {
    var c = goog.isNumber(b) ? b : a;
    this.x *= a;
    this.y *= c;
    return this
};
goog.math.Coordinate.prototype.rotateRadians = function(a, b) {
    var c = b || new goog.math.Coordinate(0, 0),
        d = this.x,
        e = this.y,
        f = Math.cos(a),
        g = Math.sin(a);
    this.x = (d - c.x) * f - (e - c.y) * g + c.x;
    this.y = (d - c.x) * g + (e - c.y) * f + c.y
};
goog.math.Coordinate.prototype.rotateDegrees = function(a, b) {
    this.rotateRadians(goog.math.toRadians(a), b)
};
goog.dom.BrowserFeature = {
    CAN_ADD_NAME_OR_TYPE_ATTRIBUTES: !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9),
    CAN_USE_CHILDREN_ATTRIBUTE: !goog.userAgent.GECKO && !goog.userAgent.IE || goog.userAgent.IE && goog.userAgent.isDocumentModeOrHigher(9) || goog.userAgent.GECKO && goog.userAgent.isVersionOrHigher("1.9.1"),
    CAN_USE_INNER_TEXT: goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"),
    CAN_USE_PARENT_ELEMENT_PROPERTY: goog.userAgent.IE || goog.userAgent.OPERA || goog.userAgent.WEBKIT,
    INNER_HTML_NEEDS_SCOPED_ELEMENT: goog.userAgent.IE,
    LEGACY_IE_RANGES: goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)
};
goog.dom.ASSUME_QUIRKS_MODE = !1;
goog.dom.ASSUME_STANDARDS_MODE = !1;
goog.dom.COMPAT_MODE_KNOWN_ = goog.dom.ASSUME_QUIRKS_MODE || goog.dom.ASSUME_STANDARDS_MODE;
goog.dom.getDomHelper = function(a) {
    return a ? new goog.dom.DomHelper(goog.dom.getOwnerDocument(a)) : goog.dom.defaultDomHelper_ || (goog.dom.defaultDomHelper_ = new goog.dom.DomHelper)
};
goog.dom.getDocument = function() {
    return document
};
goog.dom.getElement = function(a) {
    return goog.dom.getElementHelper_(document, a)
};
goog.dom.getElementHelper_ = function(a, b) {
    return goog.isString(b) ? a.getElementById(b) : b
};
goog.dom.getRequiredElement = function(a) {
    return goog.dom.getRequiredElementHelper_(document, a)
};
goog.dom.getRequiredElementHelper_ = function(a, b) {
    goog.asserts.assertString(b);
    var c = goog.dom.getElementHelper_(a, b);
    return c = goog.asserts.assertElement(c, "No element found with id: " + b)
};
goog.dom.$ = goog.dom.getElement;
goog.dom.getElementsByTagNameAndClass = function(a, b, c) {
    return goog.dom.getElementsByTagNameAndClass_(document, a, b, c)
};
goog.dom.getElementsByClass = function(a, b) {
    var c = b || document;
    return goog.dom.canUseQuerySelector_(c) ? c.querySelectorAll("." + a) : goog.dom.getElementsByTagNameAndClass_(document, "*", a, b)
};
goog.dom.getElementByClass = function(a, b) {
    var c = b || document,
        d = null;
    return (d = c.getElementsByClassName ? c.getElementsByClassName(a)[0] : goog.dom.canUseQuerySelector_(c) ? c.querySelector("." + a) : goog.dom.getElementsByTagNameAndClass_(document, "*", a, b)[0]) || null
};
goog.dom.getRequiredElementByClass = function(a, b) {
    var c = goog.dom.getElementByClass(a, b);
    return goog.asserts.assert(c, "No element found with className: " + a)
};
goog.dom.canUseQuerySelector_ = function(a) {
    return !(!a.querySelectorAll || !a.querySelector)
};
goog.dom.getElementsByTagNameAndClass_ = function(a, b, c, d) {
    a = d || a;
    b = b && "*" != b ? b.toUpperCase() : "";
    if (goog.dom.canUseQuerySelector_(a) && (b || c)) return a.querySelectorAll(b + (c ? "." + c : ""));
    if (c && a.getElementsByClassName) {
        a = a.getElementsByClassName(c);
        if (b) {
            d = {};
            for (var e = 0, f = 0, g; g = a[f]; f++) b == g.nodeName && (d[e++] = g);
            d.length = e;
            return d
        }
        return a
    }
    a = a.getElementsByTagName(b || "*");
    if (c) {
        d = {};
        for (f = e = 0; g = a[f]; f++) b = g.className, "function" == typeof b.split && goog.array.contains(b.split(/\s+/), c) && (d[e++] = g);
        d.length =
            e;
        return d
    }
    return a
};
goog.dom.$$ = goog.dom.getElementsByTagNameAndClass;
goog.dom.setProperties = function(a, b) {
    goog.object.forEach(b, function(b, d) {
        "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : goog.dom.DIRECT_ATTRIBUTE_MAP_.hasOwnProperty(d) ? a.setAttribute(goog.dom.DIRECT_ATTRIBUTE_MAP_[d], b) : goog.string.startsWith(d, "aria-") || goog.string.startsWith(d, "data-") ? a.setAttribute(d, b) : a[d] = b
    })
};
goog.dom.DIRECT_ATTRIBUTE_MAP_ = {
    cellpadding: "cellPadding",
    cellspacing: "cellSpacing",
    colspan: "colSpan",
    frameborder: "frameBorder",
    height: "height",
    maxlength: "maxLength",
    role: "role",
    rowspan: "rowSpan",
    type: "type",
    usemap: "useMap",
    valign: "vAlign",
    width: "width"
};
goog.dom.getViewportSize = function(a) {
    return goog.dom.getViewportSize_(a || window)
};
goog.dom.getViewportSize_ = function(a) {
    a = a.document;
    a = goog.dom.isCss1CompatMode_(a) ? a.documentElement : a.body;
    return new goog.math.Size(a.clientWidth, a.clientHeight)
};
goog.dom.getDocumentHeight = function() {
    return goog.dom.getDocumentHeight_(window)
};
goog.dom.getDocumentHeight_ = function(a) {
    var b = a.document,
        c = 0;
    if (b) {
        var c = b.body,
            d = b.documentElement;
        if (!d || !c) return 0;
        a = goog.dom.getViewportSize_(a).height;
        if (goog.dom.isCss1CompatMode_(b) && d.scrollHeight) c = d.scrollHeight != a ? d.scrollHeight : d.offsetHeight;
        else {
            var b = d.scrollHeight,
                e = d.offsetHeight;
            d.clientHeight != e && (b = c.scrollHeight, e = c.offsetHeight);
            c = b > a ? b > e ? b : e : b < e ? b : e
        }
    }
    return c
};
goog.dom.getPageScroll = function(a) {
    return goog.dom.getDomHelper((a || goog.global || window).document).getDocumentScroll()
};
goog.dom.getDocumentScroll = function() {
    return goog.dom.getDocumentScroll_(document)
};
goog.dom.getDocumentScroll_ = function(a) {
    var b = goog.dom.getDocumentScrollElement_(a);
    a = goog.dom.getWindow_(a);
    return goog.userAgent.IE && goog.userAgent.isVersionOrHigher("10") && a.pageYOffset != b.scrollTop ? new goog.math.Coordinate(b.scrollLeft, b.scrollTop) : new goog.math.Coordinate(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop)
};
goog.dom.getDocumentScrollElement = function() {
    return goog.dom.getDocumentScrollElement_(document)
};
goog.dom.getDocumentScrollElement_ = function(a) {
    return a.scrollingElement ? a.scrollingElement : !goog.userAgent.WEBKIT && goog.dom.isCss1CompatMode_(a) ? a.documentElement : a.body || a.documentElement
};
goog.dom.getWindow = function(a) {
    return a ? goog.dom.getWindow_(a) : window
};
goog.dom.getWindow_ = function(a) {
    return a.parentWindow || a.defaultView
};
goog.dom.createDom = function(a, b, c) {
    return goog.dom.createDom_(document, arguments)
};
goog.dom.createDom_ = function(a, b) {
    var c = b[0],
        d = b[1];
    if (!goog.dom.BrowserFeature.CAN_ADD_NAME_OR_TYPE_ATTRIBUTES && d && (d.name || d.type)) {
        c = ["<", c];
        d.name && c.push(' name="', goog.string.htmlEscape(d.name), '"');
        if (d.type) {
            c.push(' type="', goog.string.htmlEscape(d.type), '"');
            var e = {};
            goog.object.extend(e, d);
            delete e.type;
            d = e
        }
        c.push(">");
        c = c.join("")
    }
    c = a.createElement(c);
    d && (goog.isString(d) ? c.className = d : goog.isArray(d) ? c.className = d.join(" ") : goog.dom.setProperties(c, d));
    2 < b.length && goog.dom.append_(a,
        c, b, 2);
    return c
};
goog.dom.append_ = function(a, b, c, d) {
    function e(c) {
        c && b.appendChild(goog.isString(c) ? a.createTextNode(c) : c)
    }
    for (; d < c.length; d++) {
        var f = c[d];
        goog.isArrayLike(f) && !goog.dom.isNodeLike(f) ? goog.array.forEach(goog.dom.isNodeList(f) ? goog.array.toArray(f) : f, e) : e(f)
    }
};
goog.dom.$dom = goog.dom.createDom;
goog.dom.createElement = function(a) {
    return document.createElement(a)
};
goog.dom.createTextNode = function(a) {
    return document.createTextNode(String(a))
};
goog.dom.createTable = function(a, b, c) {
    return goog.dom.createTable_(document, a, b, !!c)
};
goog.dom.createTable_ = function(a, b, c, d) {
    for (var e = a.createElement(goog.dom.TagName.TABLE), f = e.appendChild(a.createElement(goog.dom.TagName.TBODY)), g = 0; g < b; g++) {
        for (var h = a.createElement(goog.dom.TagName.TR), k = 0; k < c; k++) {
            var l = a.createElement(goog.dom.TagName.TD);
            d && goog.dom.setTextContent(l, goog.string.Unicode.NBSP);
            h.appendChild(l)
        }
        f.appendChild(h)
    }
    return e
};
goog.dom.safeHtmlToNode = function(a) {
    return goog.dom.safeHtmlToNode_(document, a)
};
goog.dom.safeHtmlToNode_ = function(a, b) {
    var c = a.createElement(goog.dom.TagName.DIV);
    goog.dom.BrowserFeature.INNER_HTML_NEEDS_SCOPED_ELEMENT ? (goog.dom.safe.setInnerHtml(c, goog.html.SafeHtml.concat(goog.html.SafeHtml.create("br"), b)), c.removeChild(c.firstChild)) : goog.dom.safe.setInnerHtml(c, b);
    return goog.dom.childrenToNode_(a, c)
};
goog.dom.htmlToDocumentFragment = function(a) {
    return goog.dom.htmlToDocumentFragment_(document, a)
};
goog.dom.htmlToDocumentFragment_ = function(a, b) {
    var c = a.createElement(goog.dom.TagName.DIV);
    goog.dom.BrowserFeature.INNER_HTML_NEEDS_SCOPED_ELEMENT ? (c.innerHTML = "<br>" + b, c.removeChild(c.firstChild)) : c.innerHTML = b;
    return goog.dom.childrenToNode_(a, c)
};
goog.dom.childrenToNode_ = function(a, b) {
    if (1 == b.childNodes.length) return b.removeChild(b.firstChild);
    for (var c = a.createDocumentFragment(); b.firstChild;) c.appendChild(b.firstChild);
    return c
};
goog.dom.isCss1CompatMode = function() {
    return goog.dom.isCss1CompatMode_(document)
};
goog.dom.isCss1CompatMode_ = function(a) {
    return goog.dom.COMPAT_MODE_KNOWN_ ? goog.dom.ASSUME_STANDARDS_MODE : "CSS1Compat" == a.compatMode
};
goog.dom.canHaveChildren = function(a) {
    if (a.nodeType != goog.dom.NodeType.ELEMENT) return !1;
    switch (a.tagName) {
        case goog.dom.TagName.APPLET:
        case goog.dom.TagName.AREA:
        case goog.dom.TagName.BASE:
        case goog.dom.TagName.BR:
        case goog.dom.TagName.COL:
        case goog.dom.TagName.COMMAND:
        case goog.dom.TagName.EMBED:
        case goog.dom.TagName.FRAME:
        case goog.dom.TagName.HR:
        case goog.dom.TagName.IMG:
        case goog.dom.TagName.INPUT:
        case goog.dom.TagName.IFRAME:
        case goog.dom.TagName.ISINDEX:
        case goog.dom.TagName.KEYGEN:
        case goog.dom.TagName.LINK:
        case goog.dom.TagName.NOFRAMES:
        case goog.dom.TagName.NOSCRIPT:
        case goog.dom.TagName.META:
        case goog.dom.TagName.OBJECT:
        case goog.dom.TagName.PARAM:
        case goog.dom.TagName.SCRIPT:
        case goog.dom.TagName.SOURCE:
        case goog.dom.TagName.STYLE:
        case goog.dom.TagName.TRACK:
        case goog.dom.TagName.WBR:
            return !1
    }
    return !0
};
goog.dom.appendChild = function(a, b) {
    a.appendChild(b)
};
goog.dom.append = function(a, b) {
    goog.dom.append_(goog.dom.getOwnerDocument(a), a, arguments, 1)
};
goog.dom.removeChildren = function(a) {
    for (var b; b = a.firstChild;) a.removeChild(b)
};
goog.dom.insertSiblingBefore = function(a, b) {
    b.parentNode && b.parentNode.insertBefore(a, b)
};
goog.dom.insertSiblingAfter = function(a, b) {
    b.parentNode && b.parentNode.insertBefore(a, b.nextSibling)
};
goog.dom.insertChildAt = function(a, b, c) {
    a.insertBefore(b, a.childNodes[c] || null)
};
goog.dom.removeNode = function(a) {
    return a && a.parentNode ? a.parentNode.removeChild(a) : null
};
goog.dom.replaceNode = function(a, b) {
    var c = b.parentNode;
    c && c.replaceChild(a, b)
};
goog.dom.flattenElement = function(a) {
    var b, c = a.parentNode;
    if (c && c.nodeType != goog.dom.NodeType.DOCUMENT_FRAGMENT) {
        if (a.removeNode) return a.removeNode(!1);
        for (; b = a.firstChild;) c.insertBefore(b, a);
        return goog.dom.removeNode(a)
    }
};
goog.dom.getChildren = function(a) {
    return goog.dom.BrowserFeature.CAN_USE_CHILDREN_ATTRIBUTE && void 0 != a.children ? a.children : goog.array.filter(a.childNodes, function(a) {
        return a.nodeType == goog.dom.NodeType.ELEMENT
    })
};
goog.dom.getFirstElementChild = function(a) {
    return goog.isDef(a.firstElementChild) ? a.firstElementChild : goog.dom.getNextElementNode_(a.firstChild, !0)
};
goog.dom.getLastElementChild = function(a) {
    return goog.isDef(a.lastElementChild) ? a.lastElementChild : goog.dom.getNextElementNode_(a.lastChild, !1)
};
goog.dom.getNextElementSibling = function(a) {
    return goog.isDef(a.nextElementSibling) ? a.nextElementSibling : goog.dom.getNextElementNode_(a.nextSibling, !0)
};
goog.dom.getPreviousElementSibling = function(a) {
    return goog.isDef(a.previousElementSibling) ? a.previousElementSibling : goog.dom.getNextElementNode_(a.previousSibling, !1)
};
goog.dom.getNextElementNode_ = function(a, b) {
    for (; a && a.nodeType != goog.dom.NodeType.ELEMENT;) a = b ? a.nextSibling : a.previousSibling;
    return a
};
goog.dom.getNextNode = function(a) {
    if (!a) return null;
    if (a.firstChild) return a.firstChild;
    for (; a && !a.nextSibling;) a = a.parentNode;
    return a ? a.nextSibling : null
};
goog.dom.getPreviousNode = function(a) {
    if (!a) return null;
    if (!a.previousSibling) return a.parentNode;
    for (a = a.previousSibling; a && a.lastChild;) a = a.lastChild;
    return a
};
goog.dom.isNodeLike = function(a) {
    return goog.isObject(a) && 0 < a.nodeType
};
goog.dom.isElement = function(a) {
    return goog.isObject(a) && a.nodeType == goog.dom.NodeType.ELEMENT
};
goog.dom.isWindow = function(a) {
    return goog.isObject(a) && a.window == a
};
goog.dom.getParentElement = function(a) {
    var b;
    if (goog.dom.BrowserFeature.CAN_USE_PARENT_ELEMENT_PROPERTY && !(goog.userAgent.IE && goog.userAgent.isVersionOrHigher("9") && !goog.userAgent.isVersionOrHigher("10") && goog.global.SVGElement && a instanceof goog.global.SVGElement) && (b = a.parentElement)) return b;
    b = a.parentNode;
    return goog.dom.isElement(b) ? b : null
};
goog.dom.contains = function(a, b) {
    if (!a || !b) return !1;
    if (a.contains && b.nodeType == goog.dom.NodeType.ELEMENT) return a == b || a.contains(b);
    if ("undefined" != typeof a.compareDocumentPosition) return a == b || Boolean(a.compareDocumentPosition(b) & 16);
    for (; b && a != b;) b = b.parentNode;
    return b == a
};
goog.dom.compareNodeOrder = function(a, b) {
    if (a == b) return 0;
    if (a.compareDocumentPosition) return a.compareDocumentPosition(b) & 2 ? 1 : -1;
    if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)) {
        if (a.nodeType == goog.dom.NodeType.DOCUMENT) return -1;
        if (b.nodeType == goog.dom.NodeType.DOCUMENT) return 1
    }
    if ("sourceIndex" in a || a.parentNode && "sourceIndex" in a.parentNode) {
        var c = a.nodeType == goog.dom.NodeType.ELEMENT,
            d = b.nodeType == goog.dom.NodeType.ELEMENT;
        if (c && d) return a.sourceIndex - b.sourceIndex;
        var e = a.parentNode,
            f = b.parentNode;
        return e == f ? goog.dom.compareSiblingOrder_(a, b) : !c && goog.dom.contains(e, b) ? -1 * goog.dom.compareParentsDescendantNodeIe_(a, b) : !d && goog.dom.contains(f, a) ? goog.dom.compareParentsDescendantNodeIe_(b, a) : (c ? a.sourceIndex : e.sourceIndex) - (d ? b.sourceIndex : f.sourceIndex)
    }
    d = goog.dom.getOwnerDocument(a);
    c = d.createRange();
    c.selectNode(a);
    c.collapse(!0);
    d = d.createRange();
    d.selectNode(b);
    d.collapse(!0);
    return c.compareBoundaryPoints(goog.global.Range.START_TO_END, d)
};
goog.dom.compareParentsDescendantNodeIe_ = function(a, b) {
    var c = a.parentNode;
    if (c == b) return -1;
    for (var d = b; d.parentNode != c;) d = d.parentNode;
    return goog.dom.compareSiblingOrder_(d, a)
};
goog.dom.compareSiblingOrder_ = function(a, b) {
    for (var c = b; c = c.previousSibling;)
        if (c == a) return -1;
    return 1
};
goog.dom.findCommonAncestor = function(a) {
    var b, c = arguments.length;
    if (!c) return null;
    if (1 == c) return arguments[0];
    var d = [],
        e = Infinity;
    for (b = 0; b < c; b++) {
        for (var f = [], g = arguments[b]; g;) f.unshift(g), g = g.parentNode;
        d.push(f);
        e = Math.min(e, f.length)
    }
    f = null;
    for (b = 0; b < e; b++) {
        for (var g = d[0][b], h = 1; h < c; h++)
            if (g != d[h][b]) return f;
        f = g
    }
    return f
};
goog.dom.getOwnerDocument = function(a) {
    goog.asserts.assert(a, "Node cannot be null or undefined.");
    return a.nodeType == goog.dom.NodeType.DOCUMENT ? a : a.ownerDocument || a.document
};
goog.dom.getFrameContentDocument = function(a) {
    return a.contentDocument || a.contentWindow.document
};
goog.dom.getFrameContentWindow = function(a) {
    try {
        return a.contentWindow || (a.contentDocument ? goog.dom.getWindow(a.contentDocument) : null)
    } catch (b) {}
    return null
};
goog.dom.setTextContent = function(a, b) {
    goog.asserts.assert(null != a, "goog.dom.setTextContent expects a non-null value for node");
    if ("textContent" in a) a.textContent = b;
    else if (a.nodeType == goog.dom.NodeType.TEXT) a.data = b;
    else if (a.firstChild && a.firstChild.nodeType == goog.dom.NodeType.TEXT) {
        for (; a.lastChild != a.firstChild;) a.removeChild(a.lastChild);
        a.firstChild.data = b
    } else {
        goog.dom.removeChildren(a);
        var c = goog.dom.getOwnerDocument(a);
        a.appendChild(c.createTextNode(String(b)))
    }
};
goog.dom.getOuterHtml = function(a) {
    if ("outerHTML" in a) return a.outerHTML;
    var b = goog.dom.getOwnerDocument(a).createElement(goog.dom.TagName.DIV);
    b.appendChild(a.cloneNode(!0));
    return b.innerHTML
};
goog.dom.findNode = function(a, b) {
    var c = [];
    return goog.dom.findNodes_(a, b, c, !0) ? c[0] : void 0
};
goog.dom.findNodes = function(a, b) {
    var c = [];
    goog.dom.findNodes_(a, b, c, !1);
    return c
};
goog.dom.findNodes_ = function(a, b, c, d) {
    if (null != a)
        for (a = a.firstChild; a;) {
            if (b(a) && (c.push(a), d) || goog.dom.findNodes_(a, b, c, d)) return !0;
            a = a.nextSibling
        }
    return !1
};
goog.dom.TAGS_TO_IGNORE_ = {
    SCRIPT: 1,
    STYLE: 1,
    HEAD: 1,
    IFRAME: 1,
    OBJECT: 1
};
goog.dom.PREDEFINED_TAG_VALUES_ = {
    IMG: " ",
    BR: "\n"
};
goog.dom.isFocusableTabIndex = function(a) {
    return goog.dom.hasSpecifiedTabIndex_(a) && goog.dom.isTabIndexFocusable_(a)
};
goog.dom.setFocusableTabIndex = function(a, b) {
    b ? a.tabIndex = 0 : (a.tabIndex = -1, a.removeAttribute("tabIndex"))
};
goog.dom.isFocusable = function(a) {
    var b;
    return (b = goog.dom.nativelySupportsFocus_(a) ? !a.disabled && (!goog.dom.hasSpecifiedTabIndex_(a) || goog.dom.isTabIndexFocusable_(a)) : goog.dom.isFocusableTabIndex(a)) && goog.userAgent.IE ? goog.dom.hasNonZeroBoundingRect_(a) : b
};
goog.dom.hasSpecifiedTabIndex_ = function(a) {
    a = a.getAttributeNode("tabindex");
    return goog.isDefAndNotNull(a) && a.specified
};
goog.dom.isTabIndexFocusable_ = function(a) {
    a = a.tabIndex;
    return goog.isNumber(a) && 0 <= a && 32768 > a
};
goog.dom.nativelySupportsFocus_ = function(a) {
    return a.tagName == goog.dom.TagName.A || a.tagName == goog.dom.TagName.INPUT || a.tagName == goog.dom.TagName.TEXTAREA || a.tagName == goog.dom.TagName.SELECT || a.tagName == goog.dom.TagName.BUTTON
};
goog.dom.hasNonZeroBoundingRect_ = function(a) {
    a = !goog.isFunction(a.getBoundingClientRect) || goog.userAgent.IE && null == a.parentElement ? {
        height: a.offsetHeight,
        width: a.offsetWidth
    } : a.getBoundingClientRect();
    return goog.isDefAndNotNull(a) && 0 < a.height && 0 < a.width
};
goog.dom.getTextContent = function(a) {
    if (goog.dom.BrowserFeature.CAN_USE_INNER_TEXT && "innerText" in a) a = goog.string.canonicalizeNewlines(a.innerText);
    else {
        var b = [];
        goog.dom.getTextContent_(a, b, !0);
        a = b.join("")
    }
    a = a.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
    a = a.replace(/\u200B/g, "");
    goog.dom.BrowserFeature.CAN_USE_INNER_TEXT || (a = a.replace(/ +/g, " "));
    " " != a && (a = a.replace(/^\s*/, ""));
    return a
};
goog.dom.getRawTextContent = function(a) {
    var b = [];
    goog.dom.getTextContent_(a, b, !1);
    return b.join("")
};
goog.dom.getTextContent_ = function(a, b, c) {
    if (!(a.nodeName in goog.dom.TAGS_TO_IGNORE_))
        if (a.nodeType == goog.dom.NodeType.TEXT) c ? b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : b.push(a.nodeValue);
        else if (a.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) b.push(goog.dom.PREDEFINED_TAG_VALUES_[a.nodeName]);
    else
        for (a = a.firstChild; a;) goog.dom.getTextContent_(a, b, c), a = a.nextSibling
};
goog.dom.getNodeTextLength = function(a) {
    return goog.dom.getTextContent(a).length
};
goog.dom.getNodeTextOffset = function(a, b) {
    for (var c = b || goog.dom.getOwnerDocument(a).body, d = []; a && a != c;) {
        for (var e = a; e = e.previousSibling;) d.unshift(goog.dom.getTextContent(e));
        a = a.parentNode
    }
    return goog.string.trimLeft(d.join("")).replace(/ +/g, " ").length
};
goog.dom.getNodeAtOffset = function(a, b, c) {
    a = [a];
    for (var d = 0, e = null; 0 < a.length && d < b;)
        if (e = a.pop(), !(e.nodeName in goog.dom.TAGS_TO_IGNORE_))
            if (e.nodeType == goog.dom.NodeType.TEXT) var f = e.nodeValue.replace(/(\r\n|\r|\n)/g, "").replace(/ +/g, " "),
                d = d + f.length;
            else if (e.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) d += goog.dom.PREDEFINED_TAG_VALUES_[e.nodeName].length;
    else
        for (f = e.childNodes.length - 1; 0 <= f; f--) a.push(e.childNodes[f]);
    goog.isObject(c) && (c.remainder = e ? e.nodeValue.length + b - d - 1 : 0, c.node = e);
    return e
};
goog.dom.isNodeList = function(a) {
    if (a && "number" == typeof a.length) {
        if (goog.isObject(a)) return "function" == typeof a.item || "string" == typeof a.item;
        if (goog.isFunction(a)) return "function" == typeof a.item
    }
    return !1
};
goog.dom.getAncestorByTagNameAndClass = function(a, b, c, d) {
    if (!b && !c) return null;
    var e = b ? b.toUpperCase() : null;
    return goog.dom.getAncestor(a, function(a) {
        return (!e || a.nodeName == e) && (!c || goog.isString(a.className) && goog.array.contains(a.className.split(/\s+/), c))
    }, !0, d)
};
goog.dom.getAncestorByClass = function(a, b, c) {
    return goog.dom.getAncestorByTagNameAndClass(a, null, b, c)
};
goog.dom.getAncestor = function(a, b, c, d) {
    c || (a = a.parentNode);
    c = null == d;
    for (var e = 0; a && (c || e <= d);) {
        goog.asserts.assert("parentNode" != a.name);
        if (b(a)) return a;
        a = a.parentNode;
        e++
    }
    return null
};
goog.dom.getActiveElement = function(a) {
    try {
        return a && a.activeElement
    } catch (b) {}
    return null
};
goog.dom.getPixelRatio = function() {
    var a = goog.dom.getWindow();
    return goog.isDef(a.devicePixelRatio) ? a.devicePixelRatio : a.matchMedia ? goog.dom.matchesPixelRatio_(.75) || goog.dom.matchesPixelRatio_(1.5) || goog.dom.matchesPixelRatio_(2) || goog.dom.matchesPixelRatio_(3) || 1 : 1
};
goog.dom.matchesPixelRatio_ = function(a) {
    return goog.dom.getWindow().matchMedia("(-webkit-min-device-pixel-ratio: " + a + "),(min--moz-device-pixel-ratio: " + a + "),(min-resolution: " + a + "dppx)").matches ? a : 0
};
goog.dom.DomHelper = function(a) {
    this.document_ = a || goog.global.document || document
};
goog.dom.DomHelper.prototype.getDomHelper = goog.dom.getDomHelper;
goog.dom.DomHelper.prototype.setDocument = function(a) {
    this.document_ = a
};
goog.dom.DomHelper.prototype.getDocument = function() {
    return this.document_
};
goog.dom.DomHelper.prototype.getElement = function(a) {
    return goog.dom.getElementHelper_(this.document_, a)
};
goog.dom.DomHelper.prototype.getRequiredElement = function(a) {
    return goog.dom.getRequiredElementHelper_(this.document_, a)
};
goog.dom.DomHelper.prototype.$ = goog.dom.DomHelper.prototype.getElement;
goog.dom.DomHelper.prototype.getElementsByTagNameAndClass = function(a, b, c) {
    return goog.dom.getElementsByTagNameAndClass_(this.document_, a, b, c)
};
goog.dom.DomHelper.prototype.getElementsByClass = function(a, b) {
    return goog.dom.getElementsByClass(a, b || this.document_)
};
goog.dom.DomHelper.prototype.getElementByClass = function(a, b) {
    return goog.dom.getElementByClass(a, b || this.document_)
};
goog.dom.DomHelper.prototype.getRequiredElementByClass = function(a, b) {
    return goog.dom.getRequiredElementByClass(a, b || this.document_)
};
goog.dom.DomHelper.prototype.$$ = goog.dom.DomHelper.prototype.getElementsByTagNameAndClass;
goog.dom.DomHelper.prototype.setProperties = goog.dom.setProperties;
goog.dom.DomHelper.prototype.getViewportSize = function(a) {
    return goog.dom.getViewportSize(a || this.getWindow())
};
goog.dom.DomHelper.prototype.getDocumentHeight = function() {
    return goog.dom.getDocumentHeight_(this.getWindow())
};
goog.dom.DomHelper.prototype.createDom = function(a, b, c) {
    return goog.dom.createDom_(this.document_, arguments)
};
goog.dom.DomHelper.prototype.$dom = goog.dom.DomHelper.prototype.createDom;
goog.dom.DomHelper.prototype.createElement = function(a) {
    return this.document_.createElement(a)
};
goog.dom.DomHelper.prototype.createTextNode = function(a) {
    return this.document_.createTextNode(String(a))
};
goog.dom.DomHelper.prototype.createTable = function(a, b, c) {
    return goog.dom.createTable_(this.document_, a, b, !!c)
};
goog.dom.DomHelper.prototype.safeHtmlToNode = function(a) {
    return goog.dom.safeHtmlToNode_(this.document_, a)
};
goog.dom.DomHelper.prototype.htmlToDocumentFragment = function(a) {
    return goog.dom.htmlToDocumentFragment_(this.document_, a)
};
goog.dom.DomHelper.prototype.isCss1CompatMode = function() {
    return goog.dom.isCss1CompatMode_(this.document_)
};
goog.dom.DomHelper.prototype.getWindow = function() {
    return goog.dom.getWindow_(this.document_)
};
goog.dom.DomHelper.prototype.getDocumentScrollElement = function() {
    return goog.dom.getDocumentScrollElement_(this.document_)
};
goog.dom.DomHelper.prototype.getDocumentScroll = function() {
    return goog.dom.getDocumentScroll_(this.document_)
};
goog.dom.DomHelper.prototype.getActiveElement = function(a) {
    return goog.dom.getActiveElement(a || this.document_)
};
goog.dom.DomHelper.prototype.appendChild = goog.dom.appendChild;
goog.dom.DomHelper.prototype.append = goog.dom.append;
goog.dom.DomHelper.prototype.canHaveChildren = goog.dom.canHaveChildren;
goog.dom.DomHelper.prototype.removeChildren = goog.dom.removeChildren;
goog.dom.DomHelper.prototype.insertSiblingBefore = goog.dom.insertSiblingBefore;
goog.dom.DomHelper.prototype.insertSiblingAfter = goog.dom.insertSiblingAfter;
goog.dom.DomHelper.prototype.insertChildAt = goog.dom.insertChildAt;
goog.dom.DomHelper.prototype.removeNode = goog.dom.removeNode;
goog.dom.DomHelper.prototype.replaceNode = goog.dom.replaceNode;
goog.dom.DomHelper.prototype.flattenElement = goog.dom.flattenElement;
goog.dom.DomHelper.prototype.getChildren = goog.dom.getChildren;
goog.dom.DomHelper.prototype.getFirstElementChild = goog.dom.getFirstElementChild;
goog.dom.DomHelper.prototype.getLastElementChild = goog.dom.getLastElementChild;
goog.dom.DomHelper.prototype.getNextElementSibling = goog.dom.getNextElementSibling;
goog.dom.DomHelper.prototype.getPreviousElementSibling = goog.dom.getPreviousElementSibling;
goog.dom.DomHelper.prototype.getNextNode = goog.dom.getNextNode;
goog.dom.DomHelper.prototype.getPreviousNode = goog.dom.getPreviousNode;
goog.dom.DomHelper.prototype.isNodeLike = goog.dom.isNodeLike;
goog.dom.DomHelper.prototype.isElement = goog.dom.isElement;
goog.dom.DomHelper.prototype.isWindow = goog.dom.isWindow;
goog.dom.DomHelper.prototype.getParentElement = goog.dom.getParentElement;
goog.dom.DomHelper.prototype.contains = goog.dom.contains;
goog.dom.DomHelper.prototype.compareNodeOrder = goog.dom.compareNodeOrder;
goog.dom.DomHelper.prototype.findCommonAncestor = goog.dom.findCommonAncestor;
goog.dom.DomHelper.prototype.getOwnerDocument = goog.dom.getOwnerDocument;
goog.dom.DomHelper.prototype.getFrameContentDocument = goog.dom.getFrameContentDocument;
goog.dom.DomHelper.prototype.getFrameContentWindow = goog.dom.getFrameContentWindow;
goog.dom.DomHelper.prototype.setTextContent = goog.dom.setTextContent;
goog.dom.DomHelper.prototype.getOuterHtml = goog.dom.getOuterHtml;
goog.dom.DomHelper.prototype.findNode = goog.dom.findNode;
goog.dom.DomHelper.prototype.findNodes = goog.dom.findNodes;
goog.dom.DomHelper.prototype.isFocusableTabIndex = goog.dom.isFocusableTabIndex;
goog.dom.DomHelper.prototype.setFocusableTabIndex = goog.dom.setFocusableTabIndex;
goog.dom.DomHelper.prototype.isFocusable = goog.dom.isFocusable;
goog.dom.DomHelper.prototype.getTextContent = goog.dom.getTextContent;
goog.dom.DomHelper.prototype.getNodeTextLength = goog.dom.getNodeTextLength;
goog.dom.DomHelper.prototype.getNodeTextOffset = goog.dom.getNodeTextOffset;
goog.dom.DomHelper.prototype.getNodeAtOffset = goog.dom.getNodeAtOffset;
goog.dom.DomHelper.prototype.isNodeList = goog.dom.isNodeList;
goog.dom.DomHelper.prototype.getAncestorByTagNameAndClass = goog.dom.getAncestorByTagNameAndClass;
goog.dom.DomHelper.prototype.getAncestorByClass = goog.dom.getAncestorByClass;
goog.dom.DomHelper.prototype.getAncestor = goog.dom.getAncestor;
goog.html.SafeScript = function() {
    this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = "";
    this.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
};
goog.html.SafeScript.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeScript.fromConstant = function(a) {
    a = goog.string.Const.unwrap(a);
    return 0 === a.length ? goog.html.SafeScript.EMPTY : goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(a)
};
goog.html.SafeScript.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseSafeScriptWrappedValue_
};
goog.DEBUG && (goog.html.SafeScript.prototype.toString = function() {
    return "SafeScript{" + this.privateDoNotAccessOrElseSafeScriptWrappedValue_ + "}"
});
goog.html.SafeScript.unwrap = function(a) {
    if (a instanceof goog.html.SafeScript && a.constructor === goog.html.SafeScript && a.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseSafeScriptWrappedValue_;
    goog.asserts.fail("expected object of type SafeScript, got '" + a + "'");
    return "type_error:SafeScript"
};
goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse = function(a) {
    return (new goog.html.SafeScript).initSecurityPrivateDoNotAccessOrElse_(a)
};
goog.html.SafeScript.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a) {
    this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = a;
    return this
};
goog.html.SafeScript.EMPTY = goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse("");
goog.html.uncheckedconversions = {};
goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract = function(a, b, c) {
    goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
    goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(b, c || null)
};
goog.html.uncheckedconversions.safeScriptFromStringKnownToSatisfyTypeContract = function(a, b) {
    goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
    goog.asserts.assert(!goog.string.isEmpty(goog.string.Const.unwrap(a)), "must provide non-empty justification");
    return goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(b)
};
goog.html.uncheckedconversions.safeStyleFromStringKnownToSatisfyTypeContract = function(a, b) {
    goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
    goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
    return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b)
};
goog.html.uncheckedconversions.safeStyleSheetFromStringKnownToSatisfyTypeContract = function(a, b) {
    goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
    goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
    return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(b)
};
goog.html.uncheckedconversions.safeUrlFromStringKnownToSatisfyTypeContract = function(a, b) {
    goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
    goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(b)
};
goog.html.uncheckedconversions.trustedResourceUrlFromStringKnownToSatisfyTypeContract = function(a, b) {
    goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
    goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
    return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(b)
};
goog.iter = {};
goog.iter.StopIteration = "StopIteration" in goog.global ? goog.global.StopIteration : {
    message: "StopIteration",
    stack: ""
};
goog.iter.Iterator = function() {};
goog.iter.Iterator.prototype.next = function() {
    throw goog.iter.StopIteration;
};
goog.iter.Iterator.prototype.__iterator__ = function(a) {
    return this
};
goog.iter.toIterator = function(a) {
    if (a instanceof goog.iter.Iterator) return a;
    if ("function" == typeof a.__iterator__) return a.__iterator__(!1);
    if (goog.isArrayLike(a)) {
        var b = 0,
            c = new goog.iter.Iterator;
        c.next = function() {
            for (;;) {
                if (b >= a.length) throw goog.iter.StopIteration;
                if (b in a) return a[b++];
                b++
            }
        };
        return c
    }
    throw Error("Not implemented");
};
goog.iter.forEach = function(a, b, c) {
    if (goog.isArrayLike(a)) try {
        goog.array.forEach(a, b, c)
    } catch (d) {
        if (d !== goog.iter.StopIteration) throw d;
    } else {
        a = goog.iter.toIterator(a);
        try {
            for (;;) b.call(c, a.next(), void 0, a)
        } catch (d) {
            if (d !== goog.iter.StopIteration) throw d;
        }
    }
};
goog.iter.filter = function(a, b, c) {
    var d = goog.iter.toIterator(a);
    a = new goog.iter.Iterator;
    a.next = function() {
        for (;;) {
            var a = d.next();
            if (b.call(c, a, void 0, d)) return a
        }
    };
    return a
};
goog.iter.filterFalse = function(a, b, c) {
    return goog.iter.filter(a, goog.functions.not(b), c)
};
goog.iter.range = function(a, b, c) {
    var d = 0,
        e = a,
        f = c || 1;
    1 < arguments.length && (d = a, e = b);
    if (0 == f) throw Error("Range step argument must not be zero");
    var g = new goog.iter.Iterator;
    g.next = function() {
        if (0 < f && d >= e || 0 > f && d <= e) throw goog.iter.StopIteration;
        var a = d;
        d += f;
        return a
    };
    return g
};
goog.iter.join = function(a, b) {
    return goog.iter.toArray(a).join(b)
};
goog.iter.map = function(a, b, c) {
    var d = goog.iter.toIterator(a);
    a = new goog.iter.Iterator;
    a.next = function() {
        var a = d.next();
        return b.call(c, a, void 0, d)
    };
    return a
};
goog.iter.reduce = function(a, b, c, d) {
    var e = c;
    goog.iter.forEach(a, function(a) {
        e = b.call(d, e, a)
    });
    return e
};
goog.iter.some = function(a, b, c) {
    a = goog.iter.toIterator(a);
    try {
        for (;;)
            if (b.call(c, a.next(), void 0, a)) return !0
    } catch (d) {
        if (d !== goog.iter.StopIteration) throw d;
    }
    return !1
};
goog.iter.every = function(a, b, c) {
    a = goog.iter.toIterator(a);
    try {
        for (;;)
            if (!b.call(c, a.next(), void 0, a)) return !1
    } catch (d) {
        if (d !== goog.iter.StopIteration) throw d;
    }
    return !0
};
goog.iter.chain = function(a) {
    return goog.iter.chainFromIterable(arguments)
};
goog.iter.chainFromIterable = function(a) {
    var b = goog.iter.toIterator(a);
    a = new goog.iter.Iterator;
    var c = null;
    a.next = function() {
        for (;;) {
            if (null == c) {
                var a = b.next();
                c = goog.iter.toIterator(a)
            }
            try {
                return c.next()
            } catch (e) {
                if (e !== goog.iter.StopIteration) throw e;
                c = null
            }
        }
    };
    return a
};
goog.iter.dropWhile = function(a, b, c) {
    var d = goog.iter.toIterator(a);
    a = new goog.iter.Iterator;
    var e = !0;
    a.next = function() {
        for (;;) {
            var a = d.next();
            if (!e || !b.call(c, a, void 0, d)) return e = !1, a
        }
    };
    return a
};
goog.iter.takeWhile = function(a, b, c) {
    var d = goog.iter.toIterator(a);
    a = new goog.iter.Iterator;
    a.next = function() {
        var a = d.next();
        if (b.call(c, a, void 0, d)) return a;
        throw goog.iter.StopIteration;
    };
    return a
};
goog.iter.toArray = function(a) {
    if (goog.isArrayLike(a)) return goog.array.toArray(a);
    a = goog.iter.toIterator(a);
    var b = [];
    goog.iter.forEach(a, function(a) {
        b.push(a)
    });
    return b
};
goog.iter.equals = function(a, b, c) {
    a = goog.iter.zipLongest({}, a, b);
    var d = c || goog.array.defaultCompareEquality;
    return goog.iter.every(a, function(a) {
        return d(a[0], a[1])
    })
};
goog.iter.nextOrValue = function(a, b) {
    try {
        return goog.iter.toIterator(a).next()
    } catch (c) {
        if (c != goog.iter.StopIteration) throw c;
        return b
    }
};
goog.iter.product = function(a) {
    if (goog.array.some(arguments, function(a) {
            return !a.length
        }) || !arguments.length) return new goog.iter.Iterator;
    var b = new goog.iter.Iterator,
        c = arguments,
        d = goog.array.repeat(0, c.length);
    b.next = function() {
        if (d) {
            for (var a = goog.array.map(d, function(a, b) {
                    return c[b][a]
                }), b = d.length - 1; 0 <= b; b--) {
                goog.asserts.assert(d);
                if (d[b] < c[b].length - 1) {
                    d[b]++;
                    break
                }
                if (0 == b) {
                    d = null;
                    break
                }
                d[b] = 0
            }
            return a
        }
        throw goog.iter.StopIteration;
    };
    return b
};
goog.iter.cycle = function(a) {
    var b = goog.iter.toIterator(a),
        c = [],
        d = 0;
    a = new goog.iter.Iterator;
    var e = !1;
    a.next = function() {
        var a = null;
        if (!e) try {
            return a = b.next(), c.push(a), a
        } catch (g) {
            if (g != goog.iter.StopIteration || goog.array.isEmpty(c)) throw g;
            e = !0
        }
        a = c[d];
        d = (d + 1) % c.length;
        return a
    };
    return a
};
goog.iter.count = function(a, b) {
    var c = a || 0,
        d = goog.isDef(b) ? b : 1,
        e = new goog.iter.Iterator;
    e.next = function() {
        var a = c;
        c += d;
        return a
    };
    return e
};
goog.iter.repeat = function(a) {
    var b = new goog.iter.Iterator;
    b.next = goog.functions.constant(a);
    return b
};
goog.iter.accumulate = function(a) {
    var b = goog.iter.toIterator(a),
        c = 0;
    a = new goog.iter.Iterator;
    a.next = function() {
        return c += b.next()
    };
    return a
};
goog.iter.zip = function(a) {
    var b = arguments,
        c = new goog.iter.Iterator;
    if (0 < b.length) {
        var d = goog.array.map(b, goog.iter.toIterator);
        c.next = function() {
            return goog.array.map(d, function(a) {
                return a.next()
            })
        }
    }
    return c
};
goog.iter.zipLongest = function(a, b) {
    var c = goog.array.slice(arguments, 1),
        d = new goog.iter.Iterator;
    if (0 < c.length) {
        var e = goog.array.map(c, goog.iter.toIterator);
        d.next = function() {
            var b = !1,
                c = goog.array.map(e, function(c) {
                    var d;
                    try {
                        d = c.next(), b = !0
                    } catch (e) {
                        if (e !== goog.iter.StopIteration) throw e;
                        d = a
                    }
                    return d
                });
            if (!b) throw goog.iter.StopIteration;
            return c
        }
    }
    return d
};
goog.iter.compress = function(a, b) {
    var c = goog.iter.toIterator(b);
    return goog.iter.filter(a, function() {
        return !!c.next()
    })
};
goog.iter.GroupByIterator_ = function(a, b) {
    this.iterator = goog.iter.toIterator(a);
    this.keyFunc = b || goog.functions.identity
};
goog.inherits(goog.iter.GroupByIterator_, goog.iter.Iterator);
goog.iter.GroupByIterator_.prototype.next = function() {
    for (; this.currentKey == this.targetKey;) this.currentValue = this.iterator.next(), this.currentKey = this.keyFunc(this.currentValue);
    this.targetKey = this.currentKey;
    return [this.currentKey, this.groupItems_(this.targetKey)]
};
goog.iter.GroupByIterator_.prototype.groupItems_ = function(a) {
    for (var b = []; this.currentKey == a;) {
        b.push(this.currentValue);
        try {
            this.currentValue = this.iterator.next()
        } catch (c) {
            if (c !== goog.iter.StopIteration) throw c;
            break
        }
        this.currentKey = this.keyFunc(this.currentValue)
    }
    return b
};
goog.iter.groupBy = function(a, b) {
    return new goog.iter.GroupByIterator_(a, b)
};
goog.iter.starMap = function(a, b, c) {
    var d = goog.iter.toIterator(a);
    a = new goog.iter.Iterator;
    a.next = function() {
        var a = goog.iter.toArray(d.next());
        return b.apply(c, goog.array.concat(a, void 0, d))
    };
    return a
};
goog.iter.tee = function(a, b) {
    var c = goog.iter.toIterator(a),
        d = goog.isNumber(b) ? b : 2,
        e = goog.array.map(goog.array.range(d), function() {
            return []
        }),
        f = function() {
            var a = c.next();
            goog.array.forEach(e, function(b) {
                b.push(a)
            })
        };
    return goog.array.map(e, function(a) {
        var b = new goog.iter.Iterator;
        b.next = function() {
            goog.array.isEmpty(a) && f();
            goog.asserts.assert(!goog.array.isEmpty(a));
            return a.shift()
        };
        return b
    })
};
goog.iter.enumerate = function(a, b) {
    return goog.iter.zip(goog.iter.count(b), a)
};
goog.iter.limit = function(a, b) {
    goog.asserts.assert(goog.math.isInt(b) && 0 <= b);
    var c = goog.iter.toIterator(a),
        d = new goog.iter.Iterator,
        e = b;
    d.next = function() {
        if (0 < e--) return c.next();
        throw goog.iter.StopIteration;
    };
    return d
};
goog.iter.consume = function(a, b) {
    goog.asserts.assert(goog.math.isInt(b) && 0 <= b);
    for (var c = goog.iter.toIterator(a); 0 < b--;) goog.iter.nextOrValue(c, null);
    return c
};
goog.iter.slice = function(a, b, c) {
    goog.asserts.assert(goog.math.isInt(b) && 0 <= b);
    a = goog.iter.consume(a, b);
    goog.isNumber(c) && (goog.asserts.assert(goog.math.isInt(c) && c >= b), a = goog.iter.limit(a, c - b));
    return a
};
goog.iter.hasDuplicates_ = function(a) {
    var b = [];
    goog.array.removeDuplicates(a, b);
    return a.length != b.length
};
goog.iter.permutations = function(a, b) {
    var c = goog.iter.toArray(a),
        d = goog.isNumber(b) ? b : c.length,
        c = goog.array.repeat(c, d),
        c = goog.iter.product.apply(void 0, c);
    return goog.iter.filter(c, function(a) {
        return !goog.iter.hasDuplicates_(a)
    })
};
goog.iter.combinations = function(a, b) {
    function c(a) {
        return d[a]
    }
    var d = goog.iter.toArray(a),
        e = goog.iter.range(d.length),
        e = goog.iter.permutations(e, b),
        f = goog.iter.filter(e, function(a) {
            return goog.array.isSorted(a)
        }),
        e = new goog.iter.Iterator;
    e.next = function() {
        return goog.array.map(f.next(), c)
    };
    return e
};
goog.iter.combinationsWithReplacement = function(a, b) {
    function c(a) {
        return d[a]
    }
    var d = goog.iter.toArray(a),
        e = goog.array.range(d.length),
        e = goog.array.repeat(e, b),
        e = goog.iter.product.apply(void 0, e),
        f = goog.iter.filter(e, function(a) {
            return goog.array.isSorted(a)
        }),
        e = new goog.iter.Iterator;
    e.next = function() {
        return goog.array.map(f.next(), c)
    };
    return e
};
goog.structs = {};
goog.structs.Map = function(a, b) {
    this.map_ = {};
    this.keys_ = [];
    this.version_ = this.count_ = 0;
    var c = arguments.length;
    if (1 < c) {
        if (c % 2) throw Error("Uneven number of arguments");
        for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1])
    } else a && this.addAll(a)
};
goog.structs.Map.prototype.getCount = function() {
    return this.count_
};
goog.structs.Map.prototype.getValues = function() {
    this.cleanupKeysArray_();
    for (var a = [], b = 0; b < this.keys_.length; b++) a.push(this.map_[this.keys_[b]]);
    return a
};
goog.structs.Map.prototype.getKeys = function() {
    this.cleanupKeysArray_();
    return this.keys_.concat()
};
goog.structs.Map.prototype.containsKey = function(a) {
    return goog.structs.Map.hasKey_(this.map_, a)
};
goog.structs.Map.prototype.containsValue = function(a) {
    for (var b = 0; b < this.keys_.length; b++) {
        var c = this.keys_[b];
        if (goog.structs.Map.hasKey_(this.map_, c) && this.map_[c] == a) return !0
    }
    return !1
};
goog.structs.Map.prototype.equals = function(a, b) {
    if (this === a) return !0;
    if (this.count_ != a.getCount()) return !1;
    var c = b || goog.structs.Map.defaultEquals;
    this.cleanupKeysArray_();
    for (var d, e = 0; d = this.keys_[e]; e++)
        if (!c(this.get(d), a.get(d))) return !1;
    return !0
};
goog.structs.Map.defaultEquals = function(a, b) {
    return a === b
};
goog.structs.Map.prototype.isEmpty = function() {
    return 0 == this.count_
};
goog.structs.Map.prototype.clear = function() {
    this.map_ = {};
    this.version_ = this.count_ = this.keys_.length = 0
};
goog.structs.Map.prototype.remove = function(a) {
    return goog.structs.Map.hasKey_(this.map_, a) ? (delete this.map_[a], this.count_--, this.version_++, this.keys_.length > 2 * this.count_ && this.cleanupKeysArray_(), !0) : !1
};
goog.structs.Map.prototype.cleanupKeysArray_ = function() {
    if (this.count_ != this.keys_.length) {
        for (var a = 0, b = 0; a < this.keys_.length;) {
            var c = this.keys_[a];
            goog.structs.Map.hasKey_(this.map_, c) && (this.keys_[b++] = c);
            a++
        }
        this.keys_.length = b
    }
    if (this.count_ != this.keys_.length) {
        for (var d = {}, b = a = 0; a < this.keys_.length;) c = this.keys_[a], goog.structs.Map.hasKey_(d, c) || (this.keys_[b++] = c, d[c] = 1), a++;
        this.keys_.length = b
    }
};
goog.structs.Map.prototype.get = function(a, b) {
    return goog.structs.Map.hasKey_(this.map_, a) ? this.map_[a] : b
};
goog.structs.Map.prototype.set = function(a, b) {
    goog.structs.Map.hasKey_(this.map_, a) || (this.count_++, this.keys_.push(a), this.version_++);
    this.map_[a] = b
};
goog.structs.Map.prototype.addAll = function(a) {
    var b;
    a instanceof goog.structs.Map ? (b = a.getKeys(), a = a.getValues()) : (b = goog.object.getKeys(a), a = goog.object.getValues(a));
    for (var c = 0; c < b.length; c++) this.set(b[c], a[c])
};
goog.structs.Map.prototype.forEach = function(a, b) {
    for (var c = this.getKeys(), d = 0; d < c.length; d++) {
        var e = c[d],
            f = this.get(e);
        a.call(b, f, e, this)
    }
};
goog.structs.Map.prototype.clone = function() {
    return new goog.structs.Map(this)
};
goog.structs.Map.prototype.transpose = function() {
    for (var a = new goog.structs.Map, b = 0; b < this.keys_.length; b++) {
        var c = this.keys_[b];
        a.set(this.map_[c], c)
    }
    return a
};
goog.structs.Map.prototype.toObject = function() {
    this.cleanupKeysArray_();
    for (var a = {}, b = 0; b < this.keys_.length; b++) {
        var c = this.keys_[b];
        a[c] = this.map_[c]
    }
    return a
};
goog.structs.Map.prototype.getKeyIterator = function() {
    return this.__iterator__(!0)
};
goog.structs.Map.prototype.getValueIterator = function() {
    return this.__iterator__(!1)
};
goog.structs.Map.prototype.__iterator__ = function(a) {
    this.cleanupKeysArray_();
    var b = 0,
        c = this.version_,
        d = this,
        e = new goog.iter.Iterator;
    e.next = function() {
        if (c != d.version_) throw Error("The map has changed since the iterator was created");
        if (b >= d.keys_.length) throw goog.iter.StopIteration;
        var e = d.keys_[b++];
        return a ? e : d.map_[e]
    };
    return e
};
goog.structs.Map.hasKey_ = function(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b)
};
goog.uri = {};
goog.uri.utils = {};
goog.uri.utils.CharCode_ = {
    AMPERSAND: 38,
    EQUAL: 61,
    HASH: 35,
    QUESTION: 63
};
goog.uri.utils.buildFromEncodedParts = function(a, b, c, d, e, f, g) {
    var h = "";
    a && (h += a + ":");
    c && (h += "//", b && (h += b + "@"), h += c, d && (h += ":" + d));
    e && (h += e);
    f && (h += "?" + f);
    g && (h += "#" + g);
    return h
};
goog.uri.utils.splitRe_ = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;
goog.uri.utils.ComponentIndex = {
    SCHEME: 1,
    USER_INFO: 2,
    DOMAIN: 3,
    PORT: 4,
    PATH: 5,
    QUERY_DATA: 6,
    FRAGMENT: 7
};
goog.uri.utils.split = function(a) {
    return a.match(goog.uri.utils.splitRe_)
};
goog.uri.utils.decodeIfPossible_ = function(a, b) {
    return a ? b ? decodeURI(a) : decodeURIComponent(a) : a
};
goog.uri.utils.getComponentByIndex_ = function(a, b) {
    return goog.uri.utils.split(b)[a] || null
};
goog.uri.utils.getScheme = function(a) {
    return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.SCHEME, a)
};
goog.uri.utils.getEffectiveScheme = function(a) {
    a = goog.uri.utils.getScheme(a);
    !a && goog.global.self && goog.global.self.location && (a = goog.global.self.location.protocol, a = a.substr(0, a.length - 1));
    return a ? a.toLowerCase() : ""
};
goog.uri.utils.getUserInfoEncoded = function(a) {
    return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.USER_INFO, a)
};
goog.uri.utils.getUserInfo = function(a) {
    return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getUserInfoEncoded(a))
};
goog.uri.utils.getDomainEncoded = function(a) {
    return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.DOMAIN, a)
};
goog.uri.utils.getDomain = function(a) {
    return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getDomainEncoded(a), !0)
};
goog.uri.utils.getPort = function(a) {
    return Number(goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PORT, a)) || null
};
goog.uri.utils.getPathEncoded = function(a) {
    return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PATH, a)
};
goog.uri.utils.getPath = function(a) {
    return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getPathEncoded(a), !0)
};
goog.uri.utils.getQueryData = function(a) {
    return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.QUERY_DATA, a)
};
goog.uri.utils.getFragmentEncoded = function(a) {
    var b = a.indexOf("#");
    return 0 > b ? null : a.substr(b + 1)
};
goog.uri.utils.setFragmentEncoded = function(a, b) {
    return goog.uri.utils.removeFragment(a) + (b ? "#" + b : "")
};
goog.uri.utils.getFragment = function(a) {
    return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getFragmentEncoded(a))
};
goog.uri.utils.getHost = function(a) {
    a = goog.uri.utils.split(a);
    return goog.uri.utils.buildFromEncodedParts(a[goog.uri.utils.ComponentIndex.SCHEME], a[goog.uri.utils.ComponentIndex.USER_INFO], a[goog.uri.utils.ComponentIndex.DOMAIN], a[goog.uri.utils.ComponentIndex.PORT])
};
goog.uri.utils.getPathAndAfter = function(a) {
    a = goog.uri.utils.split(a);
    return goog.uri.utils.buildFromEncodedParts(null, null, null, null, a[goog.uri.utils.ComponentIndex.PATH], a[goog.uri.utils.ComponentIndex.QUERY_DATA], a[goog.uri.utils.ComponentIndex.FRAGMENT])
};
goog.uri.utils.removeFragment = function(a) {
    var b = a.indexOf("#");
    return 0 > b ? a : a.substr(0, b)
};
goog.uri.utils.haveSameDomain = function(a, b) {
    var c = goog.uri.utils.split(a),
        d = goog.uri.utils.split(b);
    return c[goog.uri.utils.ComponentIndex.DOMAIN] == d[goog.uri.utils.ComponentIndex.DOMAIN] && c[goog.uri.utils.ComponentIndex.SCHEME] == d[goog.uri.utils.ComponentIndex.SCHEME] && c[goog.uri.utils.ComponentIndex.PORT] == d[goog.uri.utils.ComponentIndex.PORT]
};
goog.uri.utils.assertNoFragmentsOrQueries_ = function(a) {
    if (goog.DEBUG && (0 <= a.indexOf("#") || 0 <= a.indexOf("?"))) throw Error("goog.uri.utils: Fragment or query identifiers are not supported: [" + a + "]");
};
goog.uri.utils.parseQueryData = function(a, b) {
    if (a)
        for (var c = a.split("&"), d = 0; d < c.length; d++) {
            var e = c[d].indexOf("="),
                f = null,
                g = null;
            0 <= e ? (f = c[d].substring(0, e), g = c[d].substring(e + 1)) : f = c[d];
            b(f, g ? goog.string.urlDecode(g) : "")
        }
};
goog.uri.utils.appendQueryData_ = function(a) {
    if (a[1]) {
        var b = a[0],
            c = b.indexOf("#");
        0 <= c && (a.push(b.substr(c)), a[0] = b = b.substr(0, c));
        c = b.indexOf("?");
        0 > c ? a[1] = "?" : c == b.length - 1 && (a[1] = void 0)
    }
    return a.join("")
};
goog.uri.utils.appendKeyValuePairs_ = function(a, b, c) {
    if (goog.isArray(b)) {
        goog.asserts.assertArray(b);
        for (var d = 0; d < b.length; d++) goog.uri.utils.appendKeyValuePairs_(a, String(b[d]), c)
    } else null != b && c.push("&", a, "" === b ? "" : "=", goog.string.urlEncode(b))
};
goog.uri.utils.buildQueryDataBuffer_ = function(a, b, c) {
    goog.asserts.assert(0 == Math.max(b.length - (c || 0), 0) % 2, "goog.uri.utils: Key/value lists must be even in length.");
    for (c = c || 0; c < b.length; c += 2) goog.uri.utils.appendKeyValuePairs_(b[c], b[c + 1], a);
    return a
};
goog.uri.utils.buildQueryData = function(a, b) {
    var c = goog.uri.utils.buildQueryDataBuffer_([], a, b);
    c[0] = "";
    return c.join("")
};
goog.uri.utils.buildQueryDataBufferFromMap_ = function(a, b) {
    for (var c in b) goog.uri.utils.appendKeyValuePairs_(c, b[c], a);
    return a
};
goog.uri.utils.buildQueryDataFromMap = function(a) {
    a = goog.uri.utils.buildQueryDataBufferFromMap_([], a);
    a[0] = "";
    return a.join("")
};
goog.uri.utils.appendParams = function(a, b) {
    return goog.uri.utils.appendQueryData_(2 == arguments.length ? goog.uri.utils.buildQueryDataBuffer_([a], arguments[1], 0) : goog.uri.utils.buildQueryDataBuffer_([a], arguments, 1))
};
goog.uri.utils.appendParamsFromMap = function(a, b) {
    return goog.uri.utils.appendQueryData_(goog.uri.utils.buildQueryDataBufferFromMap_([a], b))
};
goog.uri.utils.appendParam = function(a, b, c) {
    a = [a, "&", b];
    goog.isDefAndNotNull(c) && a.push("=", goog.string.urlEncode(c));
    return goog.uri.utils.appendQueryData_(a)
};
goog.uri.utils.findParam_ = function(a, b, c, d) {
    for (var e = c.length; 0 <= (b = a.indexOf(c, b)) && b < d;) {
        var f = a.charCodeAt(b - 1);
        if (f == goog.uri.utils.CharCode_.AMPERSAND || f == goog.uri.utils.CharCode_.QUESTION)
            if (f = a.charCodeAt(b + e), !f || f == goog.uri.utils.CharCode_.EQUAL || f == goog.uri.utils.CharCode_.AMPERSAND || f == goog.uri.utils.CharCode_.HASH) return b;
        b += e + 1
    }
    return -1
};
goog.uri.utils.hashOrEndRe_ = /#|$/;
goog.uri.utils.hasParam = function(a, b) {
    return 0 <= goog.uri.utils.findParam_(a, 0, b, a.search(goog.uri.utils.hashOrEndRe_))
};
goog.uri.utils.getParamValue = function(a, b) {
    var c = a.search(goog.uri.utils.hashOrEndRe_),
        d = goog.uri.utils.findParam_(a, 0, b, c);
    if (0 > d) return null;
    var e = a.indexOf("&", d);
    if (0 > e || e > c) e = c;
    d += b.length + 1;
    return goog.string.urlDecode(a.substr(d, e - d))
};
goog.uri.utils.getParamValues = function(a, b) {
    for (var c = a.search(goog.uri.utils.hashOrEndRe_), d = 0, e, f = []; 0 <= (e = goog.uri.utils.findParam_(a, d, b, c));) {
        d = a.indexOf("&", e);
        if (0 > d || d > c) d = c;
        e += b.length + 1;
        f.push(goog.string.urlDecode(a.substr(e, d - e)))
    }
    return f
};
goog.uri.utils.trailingQueryPunctuationRe_ = /[?&]($|#)/;
goog.uri.utils.removeParam = function(a, b) {
    for (var c = a.search(goog.uri.utils.hashOrEndRe_), d = 0, e, f = []; 0 <= (e = goog.uri.utils.findParam_(a, d, b, c));) f.push(a.substring(d, e)), d = Math.min(a.indexOf("&", e) + 1 || c, c);
    f.push(a.substr(d));
    return f.join("").replace(goog.uri.utils.trailingQueryPunctuationRe_, "$1")
};
goog.uri.utils.setParam = function(a, b, c) {
    return goog.uri.utils.appendParam(goog.uri.utils.removeParam(a, b), b, c)
};
goog.uri.utils.appendPath = function(a, b) {
    goog.uri.utils.assertNoFragmentsOrQueries_(a);
    goog.string.endsWith(a, "/") && (a = a.substr(0, a.length - 1));
    goog.string.startsWith(b, "/") && (b = b.substr(1));
    return goog.string.buildString(a, "/", b)
};
goog.uri.utils.setPath = function(a, b) {
    goog.string.startsWith(b, "/") || (b = "/" + b);
    var c = goog.uri.utils.split(a);
    return goog.uri.utils.buildFromEncodedParts(c[goog.uri.utils.ComponentIndex.SCHEME], c[goog.uri.utils.ComponentIndex.USER_INFO], c[goog.uri.utils.ComponentIndex.DOMAIN], c[goog.uri.utils.ComponentIndex.PORT], b, c[goog.uri.utils.ComponentIndex.QUERY_DATA], c[goog.uri.utils.ComponentIndex.FRAGMENT])
};
goog.uri.utils.StandardQueryParam = {
    RANDOM: "zx"
};
goog.uri.utils.makeUnique = function(a) {
    return goog.uri.utils.setParam(a, goog.uri.utils.StandardQueryParam.RANDOM, goog.string.getRandomString())
};
goog.structs.getCount = function(a) {
    return a.getCount && "function" == typeof a.getCount ? a.getCount() : goog.isArrayLike(a) || goog.isString(a) ? a.length : goog.object.getCount(a)
};
goog.structs.getValues = function(a) {
    if (a.getValues && "function" == typeof a.getValues) return a.getValues();
    if (goog.isString(a)) return a.split("");
    if (goog.isArrayLike(a)) {
        for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
        return b
    }
    return goog.object.getValues(a)
};
goog.structs.getKeys = function(a) {
    if (a.getKeys && "function" == typeof a.getKeys) return a.getKeys();
    if (!a.getValues || "function" != typeof a.getValues) {
        if (goog.isArrayLike(a) || goog.isString(a)) {
            var b = [];
            a = a.length;
            for (var c = 0; c < a; c++) b.push(c);
            return b
        }
        return goog.object.getKeys(a)
    }
};
goog.structs.contains = function(a, b) {
    return a.contains && "function" == typeof a.contains ? a.contains(b) : a.containsValue && "function" == typeof a.containsValue ? a.containsValue(b) : goog.isArrayLike(a) || goog.isString(a) ? goog.array.contains(a, b) : goog.object.containsValue(a, b)
};
goog.structs.isEmpty = function(a) {
    return a.isEmpty && "function" == typeof a.isEmpty ? a.isEmpty() : goog.isArrayLike(a) || goog.isString(a) ? goog.array.isEmpty(a) : goog.object.isEmpty(a)
};
goog.structs.clear = function(a) {
    a.clear && "function" == typeof a.clear ? a.clear() : goog.isArrayLike(a) ? goog.array.clear(a) : goog.object.clear(a)
};
goog.structs.forEach = function(a, b, c) {
    if (a.forEach && "function" == typeof a.forEach) a.forEach(b, c);
    else if (goog.isArrayLike(a) || goog.isString(a)) goog.array.forEach(a, b, c);
    else
        for (var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length, g = 0; g < f; g++) b.call(c, e[g], d && d[g], a)
};
goog.structs.filter = function(a, b, c) {
    if ("function" == typeof a.filter) return a.filter(b, c);
    if (goog.isArrayLike(a) || goog.isString(a)) return goog.array.filter(a, b, c);
    var d, e = goog.structs.getKeys(a),
        f = goog.structs.getValues(a),
        g = f.length;
    if (e) {
        d = {};
        for (var h = 0; h < g; h++) b.call(c, f[h], e[h], a) && (d[e[h]] = f[h])
    } else
        for (d = [], h = 0; h < g; h++) b.call(c, f[h], void 0, a) && d.push(f[h]);
    return d
};
goog.structs.map = function(a, b, c) {
    if ("function" == typeof a.map) return a.map(b, c);
    if (goog.isArrayLike(a) || goog.isString(a)) return goog.array.map(a, b, c);
    var d, e = goog.structs.getKeys(a),
        f = goog.structs.getValues(a),
        g = f.length;
    if (e) {
        d = {};
        for (var h = 0; h < g; h++) d[e[h]] = b.call(c, f[h], e[h], a)
    } else
        for (d = [], h = 0; h < g; h++) d[h] = b.call(c, f[h], void 0, a);
    return d
};
goog.structs.some = function(a, b, c) {
    if ("function" == typeof a.some) return a.some(b, c);
    if (goog.isArrayLike(a) || goog.isString(a)) return goog.array.some(a, b, c);
    for (var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length, g = 0; g < f; g++)
        if (b.call(c, e[g], d && d[g], a)) return !0;
    return !1
};
goog.structs.every = function(a, b, c) {
    if ("function" == typeof a.every) return a.every(b, c);
    if (goog.isArrayLike(a) || goog.isString(a)) return goog.array.every(a, b, c);
    for (var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length, g = 0; g < f; g++)
        if (!b.call(c, e[g], d && d[g], a)) return !1;
    return !0
};
goog.events.EventTarget = function() {
    goog.Disposable.call(this);
    this.eventTargetListeners_ = new goog.events.ListenerMap(this);
    this.actualEventTarget_ = this;
    this.parentEventTarget_ = null
};
goog.inherits(goog.events.EventTarget, goog.Disposable);
goog.events.Listenable.addImplementation(goog.events.EventTarget);
goog.events.EventTarget.MAX_ANCESTORS_ = 1E3;
goog.events.EventTarget.prototype.getParentEventTarget = function() {
    return this.parentEventTarget_
};
goog.events.EventTarget.prototype.setParentEventTarget = function(a) {
    this.parentEventTarget_ = a
};
goog.events.EventTarget.prototype.addEventListener = function(a, b, c, d) {
    goog.events.listen(this, a, b, c, d)
};
goog.events.EventTarget.prototype.removeEventListener = function(a, b, c, d) {
    goog.events.unlisten(this, a, b, c, d)
};
goog.events.EventTarget.prototype.dispatchEvent = function(a) {
    this.assertInitialized_();
    var b, c = this.getParentEventTarget();
    if (c) {
        b = [];
        for (var d = 1; c; c = c.getParentEventTarget()) b.push(c), goog.asserts.assert(++d < goog.events.EventTarget.MAX_ANCESTORS_, "infinite loop")
    }
    return goog.events.EventTarget.dispatchEventInternal_(this.actualEventTarget_, a, b)
};
goog.events.EventTarget.prototype.disposeInternal = function() {
    goog.events.EventTarget.superClass_.disposeInternal.call(this);
    this.removeAllListeners();
    this.parentEventTarget_ = null
};
goog.events.EventTarget.prototype.listen = function(a, b, c, d) {
    this.assertInitialized_();
    return this.eventTargetListeners_.add(String(a), b, !1, c, d)
};
goog.events.EventTarget.prototype.listenOnce = function(a, b, c, d) {
    return this.eventTargetListeners_.add(String(a), b, !0, c, d)
};
goog.events.EventTarget.prototype.unlisten = function(a, b, c, d) {
    return this.eventTargetListeners_.remove(String(a), b, c, d)
};
goog.events.EventTarget.prototype.unlistenByKey = function(a) {
    return this.eventTargetListeners_.removeByKey(a)
};
goog.events.EventTarget.prototype.removeAllListeners = function(a) {
    return this.eventTargetListeners_ ? this.eventTargetListeners_.removeAll(a) : 0
};
goog.events.EventTarget.prototype.fireListeners = function(a, b, c) {
    a = this.eventTargetListeners_.listeners[String(a)];
    if (!a) return !0;
    a = a.concat();
    for (var d = !0, e = 0; e < a.length; ++e) {
        var f = a[e];
        if (f && !f.removed && f.capture == b) {
            var g = f.listener,
                h = f.handler || f.src;
            f.callOnce && this.unlistenByKey(f);
            d = !1 !== g.call(h, c) && d
        }
    }
    return d && 0 != c.returnValue_
};
goog.events.EventTarget.prototype.getListeners = function(a, b) {
    return this.eventTargetListeners_.getListeners(String(a), b)
};
goog.events.EventTarget.prototype.getListener = function(a, b, c, d) {
    return this.eventTargetListeners_.getListener(String(a), b, c, d)
};
goog.events.EventTarget.prototype.hasListener = function(a, b) {
    var c = goog.isDef(a) ? String(a) : void 0;
    return this.eventTargetListeners_.hasListener(c, b)
};
goog.events.EventTarget.prototype.setTargetForTesting = function(a) {
    this.actualEventTarget_ = a
};
goog.events.EventTarget.prototype.assertInitialized_ = function() {
    goog.asserts.assert(this.eventTargetListeners_, "Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")
};
goog.events.EventTarget.dispatchEventInternal_ = function(a, b, c) {
    var d = b.type || b;
    if (goog.isString(b)) b = new goog.events.Event(b, a);
    else if (b instanceof goog.events.Event) b.target = b.target || a;
    else {
        var e = b;
        b = new goog.events.Event(d, a);
        goog.object.extend(b, e)
    }
    var e = !0,
        f;
    if (c)
        for (var g = c.length - 1; !b.propagationStopped_ && 0 <= g; g--) f = b.currentTarget = c[g], e = f.fireListeners(d, !0, b) && e;
    b.propagationStopped_ || (f = b.currentTarget = a, e = f.fireListeners(d, !0, b) && e, b.propagationStopped_ || (e = f.fireListeners(d, !1, b) && e));
    if (c)
        for (g = 0; !b.propagationStopped_ && g < c.length; g++) f = b.currentTarget = c[g], e = f.fireListeners(d, !1, b) && e;
    return e
};
goog.Timer = function(a, b) {
    goog.events.EventTarget.call(this);
    this.interval_ = a || 1;
    this.timerObject_ = b || goog.Timer.defaultTimerObject;
    this.boundTick_ = goog.bind(this.tick_, this);
    this.last_ = goog.now()
};
goog.inherits(goog.Timer, goog.events.EventTarget);
goog.Timer.MAX_TIMEOUT_ = 2147483647;
goog.Timer.INVALID_TIMEOUT_ID_ = -1;
goog.Timer.prototype.enabled = !1;
goog.Timer.defaultTimerObject = goog.global;
goog.Timer.intervalScale = .8;
goog.Timer.prototype.timer_ = null;
goog.Timer.prototype.getInterval = function() {
    return this.interval_
};
goog.Timer.prototype.setInterval = function(a) {
    this.interval_ = a;
    this.timer_ && this.enabled ? (this.stop(), this.start()) : this.timer_ && this.stop()
};
goog.Timer.prototype.tick_ = function() {
    if (this.enabled) {
        var a = goog.now() - this.last_;
        0 < a && a < this.interval_ * goog.Timer.intervalScale ? this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_ - a) : (this.timer_ && (this.timerObject_.clearTimeout(this.timer_), this.timer_ = null), this.dispatchTick(), this.enabled && (this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_), this.last_ = goog.now()))
    }
};
goog.Timer.prototype.dispatchTick = function() {
    this.dispatchEvent(goog.Timer.TICK)
};
goog.Timer.prototype.start = function() {
    this.enabled = !0;
    this.timer_ || (this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_), this.last_ = goog.now())
};
goog.Timer.prototype.stop = function() {
    this.enabled = !1;
    this.timer_ && (this.timerObject_.clearTimeout(this.timer_), this.timer_ = null)
};
goog.Timer.prototype.disposeInternal = function() {
    goog.Timer.superClass_.disposeInternal.call(this);
    this.stop();
    delete this.timerObject_
};
goog.Timer.TICK = "tick";
goog.Timer.callOnce = function(a, b, c) {
    if (goog.isFunction(a)) c && (a = goog.bind(a, c));
    else if (a && "function" == typeof a.handleEvent) a = goog.bind(a.handleEvent, a);
    else throw Error("Invalid listener argument");
    return b > goog.Timer.MAX_TIMEOUT_ ? goog.Timer.INVALID_TIMEOUT_ID_ : goog.Timer.defaultTimerObject.setTimeout(a, b || 0)
};
goog.Timer.clear = function(a) {
    goog.Timer.defaultTimerObject.clearTimeout(a)
};
goog.Timer.promise = function(a, b) {
    var c = null;
    return (new goog.Promise(function(d, e) {
        c = goog.Timer.callOnce(function() {
            d(b)
        }, a);
        c == goog.Timer.INVALID_TIMEOUT_ID_ && e(Error("Failed to schedule timer."))
    })).thenCatch(function(a) {
        goog.Timer.clear(c);
        throw a;
    })
};
goog.structs.Collection = function() {};
goog.structs.Set = function(a) {
    this.map_ = new goog.structs.Map;
    a && this.addAll(a)
};
goog.structs.Set.getKey_ = function(a) {
    var b = typeof a;
    return "object" == b && a || "function" == b ? "o" + goog.getUid(a) : b.substr(0, 1) + a
};
goog.structs.Set.prototype.getCount = function() {
    return this.map_.getCount()
};
goog.structs.Set.prototype.add = function(a) {
    this.map_.set(goog.structs.Set.getKey_(a), a)
};
goog.structs.Set.prototype.addAll = function(a) {
    a = goog.structs.getValues(a);
    for (var b = a.length, c = 0; c < b; c++) this.add(a[c])
};
goog.structs.Set.prototype.removeAll = function(a) {
    a = goog.structs.getValues(a);
    for (var b = a.length, c = 0; c < b; c++) this.remove(a[c])
};
goog.structs.Set.prototype.remove = function(a) {
    return this.map_.remove(goog.structs.Set.getKey_(a))
};
goog.structs.Set.prototype.clear = function() {
    this.map_.clear()
};
goog.structs.Set.prototype.isEmpty = function() {
    return this.map_.isEmpty()
};
goog.structs.Set.prototype.contains = function(a) {
    return this.map_.containsKey(goog.structs.Set.getKey_(a))
};
goog.structs.Set.prototype.containsAll = function(a) {
    return goog.structs.every(a, this.contains, this)
};
goog.structs.Set.prototype.intersection = function(a) {
    var b = new goog.structs.Set;
    a = goog.structs.getValues(a);
    for (var c = 0; c < a.length; c++) {
        var d = a[c];
        this.contains(d) && b.add(d)
    }
    return b
};
goog.structs.Set.prototype.difference = function(a) {
    var b = this.clone();
    b.removeAll(a);
    return b
};
goog.structs.Set.prototype.getValues = function() {
    return this.map_.getValues()
};
goog.structs.Set.prototype.clone = function() {
    return new goog.structs.Set(this)
};
goog.structs.Set.prototype.equals = function(a) {
    return this.getCount() == goog.structs.getCount(a) && this.isSubsetOf(a)
};
goog.structs.Set.prototype.isSubsetOf = function(a) {
    var b = goog.structs.getCount(a);
    if (this.getCount() > b) return !1;
    !(a instanceof goog.structs.Set) && 5 < b && (a = new goog.structs.Set(a));
    return goog.structs.every(this, function(b) {
        return goog.structs.contains(a, b)
    })
};
goog.structs.Set.prototype.__iterator__ = function(a) {
    return this.map_.__iterator__(!1)
};
goog.debug.LOGGING_ENABLED = goog.DEBUG;
goog.debug.FORCE_SLOPPY_STACKS = !1;
goog.debug.catchErrors = function(a, b, c) {
    c = c || goog.global;
    var d = c.onerror,
        e = !!b;
    goog.userAgent.WEBKIT && !goog.userAgent.isVersionOrHigher("535.3") && (e = !e);
    c.onerror = function(b, c, h, k, l) {
        d && d(b, c, h, k, l);
        a({
            message: b,
            fileName: c,
            line: h,
            col: k,
            error: l
        });
        return e
    }
};
goog.debug.expose = function(a, b) {
    if ("undefined" == typeof a) return "undefined";
    if (null == a) return "NULL";
    var c = [],
        d;
    for (d in a)
        if (b || !goog.isFunction(a[d])) {
            var e = d + " = ";
            try {
                e += a[d]
            } catch (f) {
                e += "*** " + f + " ***"
            }
            c.push(e)
        }
    return c.join("\n")
};
goog.debug.deepExpose = function(a, b) {
    var c = [],
        d = function(a, f, g) {
            var h = f + "  ";
            g = new goog.structs.Set(g);
            try {
                if (goog.isDef(a))
                    if (goog.isNull(a)) c.push("NULL");
                    else if (goog.isString(a)) c.push('"' + a.replace(/\n/g, "\n" + f) + '"');
                else if (goog.isFunction(a)) c.push(String(a).replace(/\n/g, "\n" + f));
                else if (goog.isObject(a))
                    if (g.contains(a)) c.push("*** reference loop detected ***");
                    else {
                        g.add(a);
                        c.push("{");
                        for (var k in a)
                            if (b || !goog.isFunction(a[k])) c.push("\n"), c.push(h), c.push(k + " = "), d(a[k], h, g);
                        c.push("\n" +
                            f + "}")
                    } else c.push(a);
                else c.push("undefined")
            } catch (l) {
                c.push("*** " + l + " ***")
            }
        };
    d(a, "", new goog.structs.Set);
    return c.join("")
};
goog.debug.exposeArray = function(a) {
    for (var b = [], c = 0; c < a.length; c++) goog.isArray(a[c]) ? b.push(goog.debug.exposeArray(a[c])) : b.push(a[c]);
    return "[ " + b.join(", ") + " ]"
};
goog.debug.exposeException = function(a, b) {
    var c = goog.debug.exposeExceptionAsHtml(a, b);
    return goog.html.SafeHtml.unwrap(c)
};
goog.debug.exposeExceptionAsHtml = function(a, b) {
    try {
        var c = goog.debug.normalizeErrorObject(a),
            d = goog.debug.createViewSourceUrl_(c.fileName);
        return goog.html.SafeHtml.concat(goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces("Message: " + c.message + "\nUrl: "), goog.html.SafeHtml.create("a", {
            href: d,
            target: "_new"
        }, c.fileName), goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces("\nLine: " + c.lineNumber + "\n\nBrowser stack:\n" + c.stack + "-> [end]\n\nJS stack traversal:\n" + goog.debug.getStacktrace(b) +
            "-> "))
    } catch (e) {
        return goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces("Exception trying to expose exception! You win, we lose. " + e)
    }
};
goog.debug.createViewSourceUrl_ = function(a) {
    goog.isDefAndNotNull(a) || (a = "");
    if (!/^https?:\/\//i.test(a)) return goog.html.SafeUrl.fromConstant(goog.string.Const.from("sanitizedviewsrc"));
    a = goog.html.SafeUrl.sanitize(a);
    return goog.html.uncheckedconversions.safeUrlFromStringKnownToSatisfyTypeContract(goog.string.Const.from("view-source scheme plus HTTP/HTTPS URL"), "view-source:" + goog.html.SafeUrl.unwrap(a))
};
goog.debug.normalizeErrorObject = function(a) {
    var b = goog.getObjectByName("window.location.href");
    if (goog.isString(a)) return {
        message: a,
        name: "Unknown error",
        lineNumber: "Not available",
        fileName: b,
        stack: "Not available"
    };
    var c, d, e = !1;
    try {
        c = a.lineNumber || a.line || "Not available"
    } catch (f) {
        c = "Not available", e = !0
    }
    try {
        d = a.fileName || a.filename || a.sourceURL || goog.global.$googDebugFname || b
    } catch (f) {
        d = "Not available", e = !0
    }
    return !e && a.lineNumber && a.fileName && a.stack && a.message && a.name ? a : {
        message: a.message || "Not available",
        name: a.name || "UnknownError",
        lineNumber: c,
        fileName: d,
        stack: a.stack || "Not available"
    }
};
goog.debug.enhanceError = function(a, b) {
    var c;
    "string" == typeof a ? (c = Error(a), Error.captureStackTrace && Error.captureStackTrace(c, goog.debug.enhanceError)) : c = a;
    c.stack || (c.stack = goog.debug.getStacktrace(goog.debug.enhanceError));
    if (b) {
        for (var d = 0; c["message" + d];) ++d;
        c["message" + d] = String(b)
    }
    return c
};
goog.debug.getStacktraceSimple = function(a) {
    if (!goog.debug.FORCE_SLOPPY_STACKS) {
        var b = goog.debug.getNativeStackTrace_(goog.debug.getStacktraceSimple);
        if (b) return b
    }
    for (var b = [], c = arguments.callee.caller, d = 0; c && (!a || d < a);) {
        b.push(goog.debug.getFunctionName(c));
        b.push("()\n");
        try {
            c = c.caller
        } catch (e) {
            b.push("[exception trying to get caller]\n");
            break
        }
        d++;
        if (d >= goog.debug.MAX_STACK_DEPTH) {
            b.push("[...long stack...]");
            break
        }
    }
    a && d >= a ? b.push("[...reached max depth limit...]") : b.push("[end]");
    return b.join("")
};
goog.debug.MAX_STACK_DEPTH = 50;
goog.debug.getNativeStackTrace_ = function(a) {
    var b = Error();
    if (Error.captureStackTrace) return Error.captureStackTrace(b, a), String(b.stack);
    try {
        throw b;
    } catch (c) {
        b = c
    }
    return (a = b.stack) ? String(a) : null
};
goog.debug.getStacktrace = function(a) {
    var b;
    goog.debug.FORCE_SLOPPY_STACKS || (b = goog.debug.getNativeStackTrace_(a || goog.debug.getStacktrace));
    b || (b = goog.debug.getStacktraceHelper_(a || arguments.callee.caller, []));
    return b
};
goog.debug.getStacktraceHelper_ = function(a, b) {
    var c = [];
    if (goog.array.contains(b, a)) c.push("[...circular reference...]");
    else if (a && b.length < goog.debug.MAX_STACK_DEPTH) {
        c.push(goog.debug.getFunctionName(a) + "(");
        for (var d = a.arguments, e = 0; d && e < d.length; e++) {
            0 < e && c.push(", ");
            var f;
            f = d[e];
            switch (typeof f) {
                case "object":
                    f = f ? "object" : "null";
                    break;
                case "string":
                    break;
                case "number":
                    f = String(f);
                    break;
                case "boolean":
                    f = f ? "true" : "false";
                    break;
                case "function":
                    f = (f = goog.debug.getFunctionName(f)) ? f : "[fn]";
                    break;
                default:
                    f = typeof f
            }
            40 < f.length && (f = f.substr(0, 40) + "...");
            c.push(f)
        }
        b.push(a);
        c.push(")\n");
        try {
            c.push(goog.debug.getStacktraceHelper_(a.caller, b))
        } catch (g) {
            c.push("[exception trying to get caller]\n")
        }
    } else a ? c.push("[...long stack...]") : c.push("[end]");
    return c.join("")
};
goog.debug.setFunctionResolver = function(a) {
    goog.debug.fnNameResolver_ = a
};
goog.debug.getFunctionName = function(a) {
    if (goog.debug.fnNameCache_[a]) return goog.debug.fnNameCache_[a];
    if (goog.debug.fnNameResolver_) {
        var b = goog.debug.fnNameResolver_(a);
        if (b) return goog.debug.fnNameCache_[a] = b
    }
    a = String(a);
    goog.debug.fnNameCache_[a] || (b = /function ([^\(]+)/.exec(a), goog.debug.fnNameCache_[a] = b ? b[1] : "[Anonymous]");
    return goog.debug.fnNameCache_[a]
};
goog.debug.makeWhitespaceVisible = function(a) {
    return a.replace(/ /g, "[_]").replace(/\f/g, "[f]").replace(/\n/g, "[n]\n").replace(/\r/g, "[r]").replace(/\t/g, "[t]")
};
goog.debug.runtimeType = function(a) {
    return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a
};
goog.debug.fnNameCache_ = {};
goog.debug.LogRecord = function(a, b, c, d, e) {
    this.reset(a, b, c, d, e)
};
goog.debug.LogRecord.prototype.sequenceNumber_ = 0;
goog.debug.LogRecord.prototype.exception_ = null;
goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS = !0;
goog.debug.LogRecord.nextSequenceNumber_ = 0;
goog.debug.LogRecord.prototype.reset = function(a, b, c, d, e) {
    goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS && (this.sequenceNumber_ = "number" == typeof e ? e : goog.debug.LogRecord.nextSequenceNumber_++);
    this.time_ = d || goog.now();
    this.level_ = a;
    this.msg_ = b;
    this.loggerName_ = c;
    delete this.exception_
};
goog.debug.LogRecord.prototype.getLoggerName = function() {
    return this.loggerName_
};
goog.debug.LogRecord.prototype.getException = function() {
    return this.exception_
};
goog.debug.LogRecord.prototype.setException = function(a) {
    this.exception_ = a
};
goog.debug.LogRecord.prototype.setLoggerName = function(a) {
    this.loggerName_ = a
};
goog.debug.LogRecord.prototype.getLevel = function() {
    return this.level_
};
goog.debug.LogRecord.prototype.setLevel = function(a) {
    this.level_ = a
};
goog.debug.LogRecord.prototype.getMessage = function() {
    return this.msg_
};
goog.debug.LogRecord.prototype.setMessage = function(a) {
    this.msg_ = a
};
goog.debug.LogRecord.prototype.getMillis = function() {
    return this.time_
};
goog.debug.LogRecord.prototype.setMillis = function(a) {
    this.time_ = a
};
goog.debug.LogRecord.prototype.getSequenceNumber = function() {
    return this.sequenceNumber_
};
goog.debug.LogBuffer = function() {
    goog.asserts.assert(goog.debug.LogBuffer.isBufferingEnabled(), "Cannot use goog.debug.LogBuffer without defining goog.debug.LogBuffer.CAPACITY.");
    this.clear()
};
goog.debug.LogBuffer.getInstance = function() {
    goog.debug.LogBuffer.instance_ || (goog.debug.LogBuffer.instance_ = new goog.debug.LogBuffer);
    return goog.debug.LogBuffer.instance_
};
goog.debug.LogBuffer.CAPACITY = 0;
goog.debug.LogBuffer.prototype.addRecord = function(a, b, c) {
    var d = (this.curIndex_ + 1) % goog.debug.LogBuffer.CAPACITY;
    this.curIndex_ = d;
    if (this.isFull_) return d = this.buffer_[d], d.reset(a, b, c), d;
    this.isFull_ = d == goog.debug.LogBuffer.CAPACITY - 1;
    return this.buffer_[d] = new goog.debug.LogRecord(a, b, c)
};
goog.debug.LogBuffer.isBufferingEnabled = function() {
    return 0 < goog.debug.LogBuffer.CAPACITY
};
goog.debug.LogBuffer.prototype.clear = function() {
    this.buffer_ = Array(goog.debug.LogBuffer.CAPACITY);
    this.curIndex_ = -1;
    this.isFull_ = !1
};
goog.debug.LogBuffer.prototype.forEachRecord = function(a) {
    var b = this.buffer_;
    if (b[0]) {
        var c = this.curIndex_,
            d = this.isFull_ ? c : -1;
        do d = (d + 1) % goog.debug.LogBuffer.CAPACITY, a(b[d]); while (d != c)
    }
};
goog.debug.Logger = function(a) {
    this.name_ = a;
    this.handlers_ = this.children_ = this.level_ = this.parent_ = null
};
goog.debug.Logger.ROOT_LOGGER_NAME = "";
goog.debug.Logger.ENABLE_HIERARCHY = !0;
goog.debug.Logger.ENABLE_HIERARCHY || (goog.debug.Logger.rootHandlers_ = []);
goog.debug.Logger.Level = function(a, b) {
    this.name = a;
    this.value = b
};
goog.debug.Logger.Level.prototype.toString = function() {
    return this.name
};
goog.debug.Logger.Level.OFF = new goog.debug.Logger.Level("OFF", Infinity);
goog.debug.Logger.Level.SHOUT = new goog.debug.Logger.Level("SHOUT", 1200);
goog.debug.Logger.Level.SEVERE = new goog.debug.Logger.Level("SEVERE", 1E3);
goog.debug.Logger.Level.WARNING = new goog.debug.Logger.Level("WARNING", 900);
goog.debug.Logger.Level.INFO = new goog.debug.Logger.Level("INFO", 800);
goog.debug.Logger.Level.CONFIG = new goog.debug.Logger.Level("CONFIG", 700);
goog.debug.Logger.Level.FINE = new goog.debug.Logger.Level("FINE", 500);
goog.debug.Logger.Level.FINER = new goog.debug.Logger.Level("FINER", 400);
goog.debug.Logger.Level.FINEST = new goog.debug.Logger.Level("FINEST", 300);
goog.debug.Logger.Level.ALL = new goog.debug.Logger.Level("ALL", 0);
goog.debug.Logger.Level.PREDEFINED_LEVELS = [goog.debug.Logger.Level.OFF, goog.debug.Logger.Level.SHOUT, goog.debug.Logger.Level.SEVERE, goog.debug.Logger.Level.WARNING, goog.debug.Logger.Level.INFO, goog.debug.Logger.Level.CONFIG, goog.debug.Logger.Level.FINE, goog.debug.Logger.Level.FINER, goog.debug.Logger.Level.FINEST, goog.debug.Logger.Level.ALL];
goog.debug.Logger.Level.predefinedLevelsCache_ = null;
goog.debug.Logger.Level.createPredefinedLevelsCache_ = function() {
    goog.debug.Logger.Level.predefinedLevelsCache_ = {};
    for (var a = 0, b; b = goog.debug.Logger.Level.PREDEFINED_LEVELS[a]; a++) goog.debug.Logger.Level.predefinedLevelsCache_[b.value] = b, goog.debug.Logger.Level.predefinedLevelsCache_[b.name] = b
};
goog.debug.Logger.Level.getPredefinedLevel = function(a) {
    goog.debug.Logger.Level.predefinedLevelsCache_ || goog.debug.Logger.Level.createPredefinedLevelsCache_();
    return goog.debug.Logger.Level.predefinedLevelsCache_[a] || null
};
goog.debug.Logger.Level.getPredefinedLevelByValue = function(a) {
    goog.debug.Logger.Level.predefinedLevelsCache_ || goog.debug.Logger.Level.createPredefinedLevelsCache_();
    if (a in goog.debug.Logger.Level.predefinedLevelsCache_) return goog.debug.Logger.Level.predefinedLevelsCache_[a];
    for (var b = 0; b < goog.debug.Logger.Level.PREDEFINED_LEVELS.length; ++b) {
        var c = goog.debug.Logger.Level.PREDEFINED_LEVELS[b];
        if (c.value <= a) return c
    }
    return null
};
goog.debug.Logger.getLogger = function(a) {
    return goog.debug.LogManager.getLogger(a)
};
goog.debug.Logger.logToProfilers = function(a) {
    goog.global.console && (goog.global.console.timeStamp ? goog.global.console.timeStamp(a) : goog.global.console.markTimeline && goog.global.console.markTimeline(a));
    goog.global.msWriteProfilerMark && goog.global.msWriteProfilerMark(a)
};
goog.debug.Logger.prototype.getName = function() {
    return this.name_
};
goog.debug.Logger.prototype.addHandler = function(a) {
    goog.debug.LOGGING_ENABLED && (goog.debug.Logger.ENABLE_HIERARCHY ? (this.handlers_ || (this.handlers_ = []), this.handlers_.push(a)) : (goog.asserts.assert(!this.name_, "Cannot call addHandler on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false."), goog.debug.Logger.rootHandlers_.push(a)))
};
goog.debug.Logger.prototype.removeHandler = function(a) {
    if (goog.debug.LOGGING_ENABLED) {
        var b = goog.debug.Logger.ENABLE_HIERARCHY ? this.handlers_ : goog.debug.Logger.rootHandlers_;
        return !!b && goog.array.remove(b, a)
    }
    return !1
};
goog.debug.Logger.prototype.getParent = function() {
    return this.parent_
};
goog.debug.Logger.prototype.getChildren = function() {
    this.children_ || (this.children_ = {});
    return this.children_
};
goog.debug.Logger.prototype.setLevel = function(a) {
    goog.debug.LOGGING_ENABLED && (goog.debug.Logger.ENABLE_HIERARCHY ? this.level_ = a : (goog.asserts.assert(!this.name_, "Cannot call setLevel() on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false."), goog.debug.Logger.rootLevel_ = a))
};
goog.debug.Logger.prototype.getLevel = function() {
    return goog.debug.LOGGING_ENABLED ? this.level_ : goog.debug.Logger.Level.OFF
};
goog.debug.Logger.prototype.getEffectiveLevel = function() {
    if (!goog.debug.LOGGING_ENABLED) return goog.debug.Logger.Level.OFF;
    if (!goog.debug.Logger.ENABLE_HIERARCHY) return goog.debug.Logger.rootLevel_;
    if (this.level_) return this.level_;
    if (this.parent_) return this.parent_.getEffectiveLevel();
    goog.asserts.fail("Root logger has no level set.");
    return null
};
goog.debug.Logger.prototype.isLoggable = function(a) {
    return goog.debug.LOGGING_ENABLED && a.value >= this.getEffectiveLevel().value
};
goog.debug.Logger.prototype.log = function(a, b, c) {
    goog.debug.LOGGING_ENABLED && this.isLoggable(a) && (goog.isFunction(b) && (b = b()), this.doLogRecord_(this.getLogRecord(a, b, c)))
};
goog.debug.Logger.prototype.getLogRecord = function(a, b, c) {
    a = goog.debug.LogBuffer.isBufferingEnabled() ? goog.debug.LogBuffer.getInstance().addRecord(a, b, this.name_) : new goog.debug.LogRecord(a, String(b), this.name_);
    c && a.setException(c);
    return a
};
goog.debug.Logger.prototype.shout = function(a, b) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.SHOUT, a, b)
};
goog.debug.Logger.prototype.severe = function(a, b) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.SEVERE, a, b)
};
goog.debug.Logger.prototype.warning = function(a, b) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.WARNING, a, b)
};
goog.debug.Logger.prototype.info = function(a, b) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.INFO, a, b)
};
goog.debug.Logger.prototype.config = function(a, b) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.CONFIG, a, b)
};
goog.debug.Logger.prototype.fine = function(a, b) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.FINE, a, b)
};
goog.debug.Logger.prototype.finer = function(a, b) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.FINER, a, b)
};
goog.debug.Logger.prototype.finest = function(a, b) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.FINEST, a, b)
};
goog.debug.Logger.prototype.logRecord = function(a) {
    goog.debug.LOGGING_ENABLED && this.isLoggable(a.getLevel()) && this.doLogRecord_(a)
};
goog.debug.Logger.prototype.doLogRecord_ = function(a) {
    goog.debug.Logger.logToProfilers("log:" + a.getMessage());
    if (goog.debug.Logger.ENABLE_HIERARCHY)
        for (var b = this; b;) b.callPublish_(a), b = b.getParent();
    else
        for (var b = 0, c; c = goog.debug.Logger.rootHandlers_[b++];) c(a)
};
goog.debug.Logger.prototype.callPublish_ = function(a) {
    if (this.handlers_)
        for (var b = 0, c; c = this.handlers_[b]; b++) c(a)
};
goog.debug.Logger.prototype.setParent_ = function(a) {
    this.parent_ = a
};
goog.debug.Logger.prototype.addChild_ = function(a, b) {
    this.getChildren()[a] = b
};
goog.debug.LogManager = {};
goog.debug.LogManager.loggers_ = {};
goog.debug.LogManager.rootLogger_ = null;
goog.debug.LogManager.initialize = function() {
    goog.debug.LogManager.rootLogger_ || (goog.debug.LogManager.rootLogger_ = new goog.debug.Logger(goog.debug.Logger.ROOT_LOGGER_NAME), goog.debug.LogManager.loggers_[goog.debug.Logger.ROOT_LOGGER_NAME] = goog.debug.LogManager.rootLogger_, goog.debug.LogManager.rootLogger_.setLevel(goog.debug.Logger.Level.CONFIG))
};
goog.debug.LogManager.getLoggers = function() {
    return goog.debug.LogManager.loggers_
};
goog.debug.LogManager.getRoot = function() {
    goog.debug.LogManager.initialize();
    return goog.debug.LogManager.rootLogger_
};
goog.debug.LogManager.getLogger = function(a) {
    goog.debug.LogManager.initialize();
    return goog.debug.LogManager.loggers_[a] || goog.debug.LogManager.createLogger_(a)
};
goog.debug.LogManager.createFunctionForCatchErrors = function(a) {
    return function(b) {
        (a || goog.debug.LogManager.getRoot()).severe("Error: " + b.message + " (" + b.fileName + " @ Line: " + b.line + ")")
    }
};
goog.debug.LogManager.createLogger_ = function(a) {
    var b = new goog.debug.Logger(a);
    if (goog.debug.Logger.ENABLE_HIERARCHY) {
        var c = a.lastIndexOf("."),
            d = a.substr(0, c),
            c = a.substr(c + 1),
            d = goog.debug.LogManager.getLogger(d);
        d.addChild_(c, b);
        b.setParent_(d)
    }
    return goog.debug.LogManager.loggers_[a] = b
};
goog.userAgent.product = {};
goog.userAgent.product.ASSUME_FIREFOX = !1;
goog.userAgent.product.ASSUME_IPHONE = !1;
goog.userAgent.product.ASSUME_IPAD = !1;
goog.userAgent.product.ASSUME_ANDROID = !1;
goog.userAgent.product.ASSUME_CHROME = !1;
goog.userAgent.product.ASSUME_SAFARI = !1;
goog.userAgent.product.PRODUCT_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_EDGE || goog.userAgent.ASSUME_OPERA || goog.userAgent.product.ASSUME_FIREFOX || goog.userAgent.product.ASSUME_IPHONE || goog.userAgent.product.ASSUME_IPAD || goog.userAgent.product.ASSUME_ANDROID || goog.userAgent.product.ASSUME_CHROME || goog.userAgent.product.ASSUME_SAFARI;
goog.userAgent.product.OPERA = goog.userAgent.OPERA;
goog.userAgent.product.IE = goog.userAgent.IE;
goog.userAgent.product.EDGE = goog.userAgent.EDGE;
goog.userAgent.product.FIREFOX = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_FIREFOX : goog.labs.userAgent.browser.isFirefox();
goog.userAgent.product.isIphoneOrIpod_ = function() {
    return goog.labs.userAgent.platform.isIphone() || goog.labs.userAgent.platform.isIpod()
};
goog.userAgent.product.IPHONE = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPHONE : goog.userAgent.product.isIphoneOrIpod_();
goog.userAgent.product.IPAD = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPAD : goog.labs.userAgent.platform.isIpad();
goog.userAgent.product.ANDROID = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_ANDROID : goog.labs.userAgent.browser.isAndroidBrowser();
goog.userAgent.product.CHROME = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_CHROME : goog.labs.userAgent.browser.isChrome();
goog.userAgent.product.isSafariDesktop_ = function() {
    return goog.labs.userAgent.browser.isSafari() && !goog.labs.userAgent.platform.isIos()
};
goog.userAgent.product.SAFARI = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_SAFARI : goog.userAgent.product.isSafariDesktop_();
goog.log = {};
goog.log.ENABLED = goog.debug.LOGGING_ENABLED;
goog.log.ROOT_LOGGER_NAME = goog.debug.Logger.ROOT_LOGGER_NAME;
goog.log.Logger = goog.debug.Logger;
goog.log.Level = goog.debug.Logger.Level;
goog.log.LogRecord = goog.debug.LogRecord;
goog.log.getLogger = function(a, b) {
    if (goog.log.ENABLED) {
        var c = goog.debug.LogManager.getLogger(a);
        b && c && c.setLevel(b);
        return c
    }
    return null
};
goog.log.addHandler = function(a, b) {
    goog.log.ENABLED && a && a.addHandler(b)
};
goog.log.removeHandler = function(a, b) {
    return goog.log.ENABLED && a ? a.removeHandler(b) : !1
};
goog.log.log = function(a, b, c, d) {
    goog.log.ENABLED && a && a.log(b, c, d)
};
goog.log.error = function(a, b, c) {
    goog.log.ENABLED && a && a.severe(b, c)
};
goog.log.warning = function(a, b, c) {
    goog.log.ENABLED && a && a.warning(b, c)
};
goog.log.info = function(a, b, c) {
    goog.log.ENABLED && a && a.info(b, c)
};
goog.log.fine = function(a, b, c) {
    goog.log.ENABLED && a && a.fine(b, c)
};
goog.json = {};
goog.json.USE_NATIVE_JSON = !0;
goog.json.isValid = function(a) {
    return /^\s*$/.test(a) ? !1 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))
};
goog.json.parse = goog.json.USE_NATIVE_JSON ? goog.global.JSON.parse : function(a) {
    a = String(a);
    if (goog.json.isValid(a)) try {
        return eval("(" + a + ")")
    } catch (b) {}
    throw Error("Invalid JSON string: " + a);
};
goog.json.unsafeParse = goog.json.USE_NATIVE_JSON ? goog.global.JSON.parse : function(a) {
    return eval("(" + a + ")")
};
goog.json.serialize = goog.json.USE_NATIVE_JSON ? goog.global.JSON.stringify : function(a, b) {
    return (new goog.json.Serializer(b)).serialize(a)
};
goog.json.Serializer = function(a) {
    this.replacer_ = a
};
goog.json.Serializer.prototype.serialize = function(a) {
    var b = [];
    this.serializeInternal(a, b);
    return b.join("")
};
goog.json.Serializer.prototype.serializeInternal = function(a, b) {
    if (null == a) b.push("null");
    else {
        if ("object" == typeof a) {
            if (goog.isArray(a)) {
                this.serializeArray(a, b);
                return
            }
            if (a instanceof String || a instanceof Number || a instanceof Boolean) a = a.valueOf();
            else {
                this.serializeObject_(a, b);
                return
            }
        }
        switch (typeof a) {
            case "string":
                this.serializeString_(a, b);
                break;
            case "number":
                this.serializeNumber_(a, b);
                break;
            case "boolean":
                b.push(String(a));
                break;
            case "function":
                b.push("null");
                break;
            default:
                throw Error("Unknown type: " +
                    typeof a);
        }
    }
};
goog.json.Serializer.charToJsonCharCache_ = {
    '"': '\\"',
    "\\": "\\\\",
    "/": "\\/",
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "\t": "\\t",
    "\x0B": "\\u000b"
};
goog.json.Serializer.charsToReplace_ = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
goog.json.Serializer.prototype.serializeString_ = function(a, b) {
    b.push('"', a.replace(goog.json.Serializer.charsToReplace_, function(a) {
        var b = goog.json.Serializer.charToJsonCharCache_[a];
        b || (b = "\\u" + (a.charCodeAt(0) | 65536).toString(16).substr(1), goog.json.Serializer.charToJsonCharCache_[a] = b);
        return b
    }), '"')
};
goog.json.Serializer.prototype.serializeNumber_ = function(a, b) {
    b.push(isFinite(a) && !isNaN(a) ? String(a) : "null")
};
goog.json.Serializer.prototype.serializeArray = function(a, b) {
    var c = a.length;
    b.push("[");
    for (var d = "", e = 0; e < c; e++) b.push(d), d = a[e], this.serializeInternal(this.replacer_ ? this.replacer_.call(a, String(e), d) : d, b), d = ",";
    b.push("]")
};
goog.json.Serializer.prototype.serializeObject_ = function(a, b) {
    b.push("{");
    var c = "",
        d;
    for (d in a)
        if (Object.prototype.hasOwnProperty.call(a, d)) {
            var e = a[d];
            "function" != typeof e && (b.push(c), this.serializeString_(d, b), b.push(":"), this.serializeInternal(this.replacer_ ? this.replacer_.call(a, d, e) : e, b), c = ",")
        }
    b.push("}")
};
goog.net = {};
goog.net.ErrorCode = {
    NO_ERROR: 0,
    ACCESS_DENIED: 1,
    FILE_NOT_FOUND: 2,
    FF_SILENT_ERROR: 3,
    CUSTOM_ERROR: 4,
    EXCEPTION: 5,
    HTTP_ERROR: 6,
    ABORT: 7,
    TIMEOUT: 8,
    OFFLINE: 9
};
goog.net.ErrorCode.getDebugMessage = function(a) {
    switch (a) {
        case goog.net.ErrorCode.NO_ERROR:
            return "No Error";
        case goog.net.ErrorCode.ACCESS_DENIED:
            return "Access denied to content document";
        case goog.net.ErrorCode.FILE_NOT_FOUND:
            return "File not found";
        case goog.net.ErrorCode.FF_SILENT_ERROR:
            return "Firefox silently errored";
        case goog.net.ErrorCode.CUSTOM_ERROR:
            return "Application custom error";
        case goog.net.ErrorCode.EXCEPTION:
            return "An exception occurred";
        case goog.net.ErrorCode.HTTP_ERROR:
            return "Http response at 400 or 500 level";
        case goog.net.ErrorCode.ABORT:
            return "Request was aborted";
        case goog.net.ErrorCode.TIMEOUT:
            return "Request timed out";
        case goog.net.ErrorCode.OFFLINE:
            return "The resource is not available offline";
        default:
            return "Unrecognized error code"
    }
};
goog.net.XhrLike = function() {};
goog.net.XhrLike.prototype.open = function(a, b, c, d, e) {};
goog.net.XhrLike.prototype.send = function(a) {};
goog.net.XhrLike.prototype.abort = function() {};
goog.net.XhrLike.prototype.setRequestHeader = function(a, b) {};
goog.net.XhrLike.prototype.getResponseHeader = function(a) {};
goog.net.XhrLike.prototype.getAllResponseHeaders = function() {};
goog.net.XmlHttpFactory = function() {};
goog.net.XmlHttpFactory.prototype.cachedOptions_ = null;
goog.net.XmlHttpFactory.prototype.getOptions = function() {
    return this.cachedOptions_ || (this.cachedOptions_ = this.internalGetOptions())
};
goog.net.WrapperXmlHttpFactory = function(a, b) {
    goog.net.XmlHttpFactory.call(this);
    this.xhrFactory_ = a;
    this.optionsFactory_ = b
};
goog.inherits(goog.net.WrapperXmlHttpFactory, goog.net.XmlHttpFactory);
goog.net.WrapperXmlHttpFactory.prototype.createInstance = function() {
    return this.xhrFactory_()
};
goog.net.WrapperXmlHttpFactory.prototype.getOptions = function() {
    return this.optionsFactory_()
};
goog.net.XmlHttp = function() {
    return goog.net.XmlHttp.factory_.createInstance()
};
goog.net.XmlHttp.ASSUME_NATIVE_XHR = !1;
goog.net.XmlHttpDefines = {};
goog.net.XmlHttpDefines.ASSUME_NATIVE_XHR = !1;
goog.net.XmlHttp.getOptions = function() {
    return goog.net.XmlHttp.factory_.getOptions()
};
goog.net.XmlHttp.OptionType = {
    USE_NULL_FUNCTION: 0,
    LOCAL_REQUEST_ERROR: 1
};
goog.net.XmlHttp.ReadyState = {
    UNINITIALIZED: 0,
    LOADING: 1,
    LOADED: 2,
    INTERACTIVE: 3,
    COMPLETE: 4
};
goog.net.XmlHttp.setFactory = function(a, b) {
    goog.net.XmlHttp.setGlobalFactory(new goog.net.WrapperXmlHttpFactory(goog.asserts.assert(a), goog.asserts.assert(b)))
};
goog.net.XmlHttp.setGlobalFactory = function(a) {
    goog.net.XmlHttp.factory_ = a
};
goog.net.DefaultXmlHttpFactory = function() {
    goog.net.XmlHttpFactory.call(this)
};
goog.inherits(goog.net.DefaultXmlHttpFactory, goog.net.XmlHttpFactory);
goog.net.DefaultXmlHttpFactory.prototype.createInstance = function() {
    var a = this.getProgId_();
    return a ? new ActiveXObject(a) : new XMLHttpRequest
};
goog.net.DefaultXmlHttpFactory.prototype.internalGetOptions = function() {
    var a = {};
    this.getProgId_() && (a[goog.net.XmlHttp.OptionType.USE_NULL_FUNCTION] = !0, a[goog.net.XmlHttp.OptionType.LOCAL_REQUEST_ERROR] = !0);
    return a
};
goog.net.DefaultXmlHttpFactory.prototype.getProgId_ = function() {
    if (goog.net.XmlHttp.ASSUME_NATIVE_XHR || goog.net.XmlHttpDefines.ASSUME_NATIVE_XHR) return "";
    if (!this.ieProgId_ && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
        for (var a = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], b = 0; b < a.length; b++) {
            var c = a[b];
            try {
                return new ActiveXObject(c), this.ieProgId_ = c
            } catch (d) {}
        }
        throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
    }
    return this.ieProgId_
};
goog.net.XmlHttp.setGlobalFactory(new goog.net.DefaultXmlHttpFactory);
goog.net.EventType = {
    COMPLETE: "complete",
    SUCCESS: "success",
    ERROR: "error",
    ABORT: "abort",
    READY: "ready",
    READY_STATE_CHANGE: "readystatechange",
    TIMEOUT: "timeout",
    INCREMENTAL_DATA: "incrementaldata",
    PROGRESS: "progress",
    DOWNLOAD_PROGRESS: "downloadprogress",
    UPLOAD_PROGRESS: "uploadprogress"
};
goog.net.HttpStatus = {
    CONTINUE: 100,
    SWITCHING_PROTOCOLS: 101,
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NON_AUTHORITATIVE_INFORMATION: 203,
    NO_CONTENT: 204,
    RESET_CONTENT: 205,
    PARTIAL_CONTENT: 206,
    MULTIPLE_CHOICES: 300,
    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    SEE_OTHER: 303,
    NOT_MODIFIED: 304,
    USE_PROXY: 305,
    TEMPORARY_REDIRECT: 307,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    PROXY_AUTHENTICATION_REQUIRED: 407,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    GONE: 410,
    LENGTH_REQUIRED: 411,
    PRECONDITION_FAILED: 412,
    REQUEST_ENTITY_TOO_LARGE: 413,
    REQUEST_URI_TOO_LONG: 414,
    UNSUPPORTED_MEDIA_TYPE: 415,
    REQUEST_RANGE_NOT_SATISFIABLE: 416,
    EXPECTATION_FAILED: 417,
    PRECONDITION_REQUIRED: 428,
    TOO_MANY_REQUESTS: 429,
    REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    HTTP_VERSION_NOT_SUPPORTED: 505,
    NETWORK_AUTHENTICATION_REQUIRED: 511,
    QUIRK_IE_NO_CONTENT: 1223
};
goog.net.HttpStatus.isSuccess = function(a) {
    switch (a) {
        case goog.net.HttpStatus.OK:
        case goog.net.HttpStatus.CREATED:
        case goog.net.HttpStatus.ACCEPTED:
        case goog.net.HttpStatus.NO_CONTENT:
        case goog.net.HttpStatus.PARTIAL_CONTENT:
        case goog.net.HttpStatus.NOT_MODIFIED:
        case goog.net.HttpStatus.QUIRK_IE_NO_CONTENT:
            return !0;
        default:
            return !1
    }
};
goog.net.XhrIo = function(a) {
    goog.events.EventTarget.call(this);
    this.headers = new goog.structs.Map;
    this.xmlHttpFactory_ = a || null;
    this.active_ = !1;
    this.xhrOptions_ = this.xhr_ = null;
    this.lastMethod_ = this.lastUri_ = "";
    this.lastErrorCode_ = goog.net.ErrorCode.NO_ERROR;
    this.lastError_ = "";
    this.inAbort_ = this.inOpen_ = this.inSend_ = this.errorDispatched_ = !1;
    this.timeoutInterval_ = 0;
    this.timeoutId_ = null;
    this.responseType_ = goog.net.XhrIo.ResponseType.DEFAULT;
    this.useXhr2Timeout_ = this.progressEventsEnabled_ = this.withCredentials_ = !1
};
goog.inherits(goog.net.XhrIo, goog.events.EventTarget);
goog.net.XhrIo.ResponseType = {
    DEFAULT: "",
    TEXT: "text",
    DOCUMENT: "document",
    BLOB: "blob",
    ARRAY_BUFFER: "arraybuffer"
};
goog.net.XhrIo.prototype.logger_ = goog.log.getLogger("goog.net.XhrIo");
goog.net.XhrIo.CONTENT_TYPE_HEADER = "Content-Type";
goog.net.XhrIo.HTTP_SCHEME_PATTERN = /^https?$/i;
goog.net.XhrIo.METHODS_WITH_FORM_DATA = ["POST", "PUT"];
goog.net.XhrIo.FORM_CONTENT_TYPE = "application/x-www-form-urlencoded;charset=utf-8";
goog.net.XhrIo.XHR2_TIMEOUT_ = "timeout";
goog.net.XhrIo.XHR2_ON_TIMEOUT_ = "ontimeout";
goog.net.XhrIo.sendInstances_ = [];
goog.net.XhrIo.send = function(a, b, c, d, e, f, g) {
    var h = new goog.net.XhrIo;
    goog.net.XhrIo.sendInstances_.push(h);
    b && h.listen(goog.net.EventType.COMPLETE, b);
    h.listenOnce(goog.net.EventType.READY, h.cleanupSend_);
    f && h.setTimeoutInterval(f);
    g && h.setWithCredentials(g);
    h.send(a, c, d, e);
    return h
};
goog.net.XhrIo.cleanup = function() {
    for (var a = goog.net.XhrIo.sendInstances_; a.length;) a.pop().dispose()
};
goog.net.XhrIo.protectEntryPoints = function(a) {
    goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = a.protectEntryPoint(goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_)
};
goog.net.XhrIo.prototype.cleanupSend_ = function() {
    this.dispose();
    goog.array.remove(goog.net.XhrIo.sendInstances_, this)
};
goog.net.XhrIo.prototype.getTimeoutInterval = function() {
    return this.timeoutInterval_
};
goog.net.XhrIo.prototype.setTimeoutInterval = function(a) {
    this.timeoutInterval_ = Math.max(0, a)
};
goog.net.XhrIo.prototype.setResponseType = function(a) {
    this.responseType_ = a
};
goog.net.XhrIo.prototype.getResponseType = function() {
    return this.responseType_
};
goog.net.XhrIo.prototype.setWithCredentials = function(a) {
    this.withCredentials_ = a
};
goog.net.XhrIo.prototype.getWithCredentials = function() {
    return this.withCredentials_
};
goog.net.XhrIo.prototype.setProgressEventsEnabled = function(a) {
    this.progressEventsEnabled_ = a
};
goog.net.XhrIo.prototype.getProgressEventsEnabled = function() {
    return this.progressEventsEnabled_
};
goog.net.XhrIo.prototype.send = function(a, b, c, d) {
    if (this.xhr_) throw Error("[goog.net.XhrIo] Object is active with another request=" + this.lastUri_ + "; newUri=" + a);
    b = b ? b.toUpperCase() : "GET";
    this.lastUri_ = a;
    this.lastError_ = "";
    this.lastErrorCode_ = goog.net.ErrorCode.NO_ERROR;
    this.lastMethod_ = b;
    this.errorDispatched_ = !1;
    this.active_ = !0;
    this.xhr_ = this.createXhr();
    this.xhrOptions_ = this.xmlHttpFactory_ ? this.xmlHttpFactory_.getOptions() : goog.net.XmlHttp.getOptions();
    this.xhr_.onreadystatechange = goog.bind(this.onReadyStateChange_,
        this);
    this.getProgressEventsEnabled() && "onprogress" in this.xhr_ && (this.xhr_.onprogress = goog.bind(function(a) {
        this.onProgressHandler_(a, !0)
    }, this), this.xhr_.upload && (this.xhr_.upload.onprogress = goog.bind(this.onProgressHandler_, this)));
    try {
        goog.log.fine(this.logger_, this.formatMsg_("Opening Xhr")), this.inOpen_ = !0, this.xhr_.open(b, String(a), !0), this.inOpen_ = !1
    } catch (f) {
        goog.log.fine(this.logger_, this.formatMsg_("Error opening Xhr: " + f.message));
        this.error_(goog.net.ErrorCode.EXCEPTION, f);
        return
    }
    a = c ||
        "";
    var e = this.headers.clone();
    d && goog.structs.forEach(d, function(a, b) {
        e.set(b, a)
    });
    d = goog.array.find(e.getKeys(), goog.net.XhrIo.isContentTypeHeader_);
    c = goog.global.FormData && a instanceof goog.global.FormData;
    !goog.array.contains(goog.net.XhrIo.METHODS_WITH_FORM_DATA, b) || d || c || e.set(goog.net.XhrIo.CONTENT_TYPE_HEADER, goog.net.XhrIo.FORM_CONTENT_TYPE);
    e.forEach(function(a, b) {
        this.xhr_.setRequestHeader(b, a)
    }, this);
    this.responseType_ && (this.xhr_.responseType = this.responseType_);
    goog.object.containsKey(this.xhr_,
        "withCredentials") && (this.xhr_.withCredentials = this.withCredentials_);
    try {
        this.cleanUpTimeoutTimer_(), 0 < this.timeoutInterval_ && (this.useXhr2Timeout_ = goog.net.XhrIo.shouldUseXhr2Timeout_(this.xhr_), goog.log.fine(this.logger_, this.formatMsg_("Will abort after " + this.timeoutInterval_ + "ms if incomplete, xhr2 " + this.useXhr2Timeout_)), this.useXhr2Timeout_ ? (this.xhr_[goog.net.XhrIo.XHR2_TIMEOUT_] = this.timeoutInterval_, this.xhr_[goog.net.XhrIo.XHR2_ON_TIMEOUT_] = goog.bind(this.timeout_, this)) : this.timeoutId_ =
            goog.Timer.callOnce(this.timeout_, this.timeoutInterval_, this)), goog.log.fine(this.logger_, this.formatMsg_("Sending request")), this.inSend_ = !0, this.xhr_.send(a), this.inSend_ = !1
    } catch (f) {
        goog.log.fine(this.logger_, this.formatMsg_("Send error: " + f.message)), this.error_(goog.net.ErrorCode.EXCEPTION, f)
    }
};
goog.net.XhrIo.shouldUseXhr2Timeout_ = function(a) {
    return goog.userAgent.IE && goog.userAgent.isVersionOrHigher(9) && goog.isNumber(a[goog.net.XhrIo.XHR2_TIMEOUT_]) && goog.isDef(a[goog.net.XhrIo.XHR2_ON_TIMEOUT_])
};
goog.net.XhrIo.isContentTypeHeader_ = function(a) {
    return goog.string.caseInsensitiveEquals(goog.net.XhrIo.CONTENT_TYPE_HEADER, a)
};
goog.net.XhrIo.prototype.createXhr = function() {
    return this.xmlHttpFactory_ ? this.xmlHttpFactory_.createInstance() : goog.net.XmlHttp()
};
goog.net.XhrIo.prototype.timeout_ = function() {
    "undefined" != typeof goog && this.xhr_ && (this.lastError_ = "Timed out after " + this.timeoutInterval_ + "ms, aborting", this.lastErrorCode_ = goog.net.ErrorCode.TIMEOUT, goog.log.fine(this.logger_, this.formatMsg_(this.lastError_)), this.dispatchEvent(goog.net.EventType.TIMEOUT), this.abort(goog.net.ErrorCode.TIMEOUT))
};
goog.net.XhrIo.prototype.error_ = function(a, b) {
    this.active_ = !1;
    this.xhr_ && (this.inAbort_ = !0, this.xhr_.abort(), this.inAbort_ = !1);
    this.lastError_ = b;
    this.lastErrorCode_ = a;
    this.dispatchErrors_();
    this.cleanUpXhr_()
};
goog.net.XhrIo.prototype.dispatchErrors_ = function() {
    this.errorDispatched_ || (this.errorDispatched_ = !0, this.dispatchEvent(goog.net.EventType.COMPLETE), this.dispatchEvent(goog.net.EventType.ERROR))
};
goog.net.XhrIo.prototype.abort = function(a) {
    this.xhr_ && this.active_ && (goog.log.fine(this.logger_, this.formatMsg_("Aborting")), this.active_ = !1, this.inAbort_ = !0, this.xhr_.abort(), this.inAbort_ = !1, this.lastErrorCode_ = a || goog.net.ErrorCode.ABORT, this.dispatchEvent(goog.net.EventType.COMPLETE), this.dispatchEvent(goog.net.EventType.ABORT), this.cleanUpXhr_())
};
goog.net.XhrIo.prototype.disposeInternal = function() {
    this.xhr_ && (this.active_ && (this.active_ = !1, this.inAbort_ = !0, this.xhr_.abort(), this.inAbort_ = !1), this.cleanUpXhr_(!0));
    goog.net.XhrIo.superClass_.disposeInternal.call(this)
};
goog.net.XhrIo.prototype.onReadyStateChange_ = function() {
    if (!this.isDisposed())
        if (this.inOpen_ || this.inSend_ || this.inAbort_) this.onReadyStateChangeHelper_();
        else this.onReadyStateChangeEntryPoint_()
};
goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = function() {
    this.onReadyStateChangeHelper_()
};
goog.net.XhrIo.prototype.onReadyStateChangeHelper_ = function() {
    if (this.active_ && "undefined" != typeof goog)
        if (this.xhrOptions_[goog.net.XmlHttp.OptionType.LOCAL_REQUEST_ERROR] && this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE && 2 == this.getStatus()) goog.log.fine(this.logger_, this.formatMsg_("Local request error detected and ignored"));
        else if (this.inSend_ && this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE) goog.Timer.callOnce(this.onReadyStateChange_, 0, this);
    else if (this.dispatchEvent(goog.net.EventType.READY_STATE_CHANGE),
        this.isComplete()) {
        goog.log.fine(this.logger_, this.formatMsg_("Request complete"));
        this.active_ = !1;
        try {
            this.isSuccess() ? (this.dispatchEvent(goog.net.EventType.COMPLETE), this.dispatchEvent(goog.net.EventType.SUCCESS)) : (this.lastErrorCode_ = goog.net.ErrorCode.HTTP_ERROR, this.lastError_ = this.getStatusText() + " [" + this.getStatus() + "]", this.dispatchErrors_())
        } finally {
            this.cleanUpXhr_()
        }
    }
};
goog.net.XhrIo.prototype.onProgressHandler_ = function(a, b) {
    goog.asserts.assert(a.type === goog.net.EventType.PROGRESS, "goog.net.EventType.PROGRESS is of the same type as raw XHR progress.");
    this.dispatchEvent(goog.net.XhrIo.buildProgressEvent_(a, goog.net.EventType.PROGRESS));
    this.dispatchEvent(goog.net.XhrIo.buildProgressEvent_(a, b ? goog.net.EventType.DOWNLOAD_PROGRESS : goog.net.EventType.UPLOAD_PROGRESS))
};
goog.net.XhrIo.buildProgressEvent_ = function(a, b) {
    return {
        type: b,
        lengthComputable: a.lengthComputable,
        loaded: a.loaded,
        total: a.total
    }
};
goog.net.XhrIo.prototype.cleanUpXhr_ = function(a) {
    if (this.xhr_) {
        this.cleanUpTimeoutTimer_();
        var b = this.xhr_,
            c = this.xhrOptions_[goog.net.XmlHttp.OptionType.USE_NULL_FUNCTION] ? goog.nullFunction : null;
        this.xhrOptions_ = this.xhr_ = null;
        a || this.dispatchEvent(goog.net.EventType.READY);
        try {
            b.onreadystatechange = c
        } catch (d) {
            goog.log.error(this.logger_, "Problem encountered resetting onreadystatechange: " + d.message)
        }
    }
};
goog.net.XhrIo.prototype.cleanUpTimeoutTimer_ = function() {
    this.xhr_ && this.useXhr2Timeout_ && (this.xhr_[goog.net.XhrIo.XHR2_ON_TIMEOUT_] = null);
    goog.isNumber(this.timeoutId_) && (goog.Timer.clear(this.timeoutId_), this.timeoutId_ = null)
};
goog.net.XhrIo.prototype.isActive = function() {
    return !!this.xhr_
};
goog.net.XhrIo.prototype.isComplete = function() {
    return this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE
};
goog.net.XhrIo.prototype.isSuccess = function() {
    var a = this.getStatus();
    return goog.net.HttpStatus.isSuccess(a) || 0 === a && !this.isLastUriEffectiveSchemeHttp_()
};
goog.net.XhrIo.prototype.isLastUriEffectiveSchemeHttp_ = function() {
    var a = goog.uri.utils.getEffectiveScheme(String(this.lastUri_));
    return goog.net.XhrIo.HTTP_SCHEME_PATTERN.test(a)
};
goog.net.XhrIo.prototype.getReadyState = function() {
    return this.xhr_ ? this.xhr_.readyState : goog.net.XmlHttp.ReadyState.UNINITIALIZED
};
goog.net.XhrIo.prototype.getStatus = function() {
    try {
        return this.getReadyState() > goog.net.XmlHttp.ReadyState.LOADED ? this.xhr_.status : -1
    } catch (a) {
        return -1
    }
};
goog.net.XhrIo.prototype.getStatusText = function() {
    try {
        return this.getReadyState() > goog.net.XmlHttp.ReadyState.LOADED ? this.xhr_.statusText : ""
    } catch (a) {
        return goog.log.fine(this.logger_, "Can not get status: " + a.message), ""
    }
};
goog.net.XhrIo.prototype.getLastUri = function() {
    return String(this.lastUri_)
};
goog.net.XhrIo.prototype.getResponseText = function() {
    try {
        return this.xhr_ ? this.xhr_.responseText : ""
    } catch (a) {
        return goog.log.fine(this.logger_, "Can not get responseText: " + a.message), ""
    }
};
goog.net.XhrIo.prototype.getResponseBody = function() {
    try {
        if (this.xhr_ && "responseBody" in this.xhr_) return this.xhr_.responseBody
    } catch (a) {
        goog.log.fine(this.logger_, "Can not get responseBody: " + a.message)
    }
    return null
};
goog.net.XhrIo.prototype.getResponseXml = function() {
    try {
        return this.xhr_ ? this.xhr_.responseXML : null
    } catch (a) {
        return goog.log.fine(this.logger_, "Can not get responseXML: " + a.message), null
    }
};
goog.net.XhrIo.prototype.getResponseJson = function(a) {
    if (this.xhr_) {
        var b = this.xhr_.responseText;
        a && 0 == b.indexOf(a) && (b = b.substring(a.length));
        return goog.json.parse(b)
    }
};
goog.net.XhrIo.prototype.getResponse = function() {
    try {
        if (!this.xhr_) return null;
        if ("response" in this.xhr_) return this.xhr_.response;
        switch (this.responseType_) {
            case goog.net.XhrIo.ResponseType.DEFAULT:
            case goog.net.XhrIo.ResponseType.TEXT:
                return this.xhr_.responseText;
            case goog.net.XhrIo.ResponseType.ARRAY_BUFFER:
                if ("mozResponseArrayBuffer" in this.xhr_) return this.xhr_.mozResponseArrayBuffer
        }
        goog.log.error(this.logger_, "Response type " + this.responseType_ + " is not supported on this browser");
        return null
    } catch (a) {
        return goog.log.fine(this.logger_,
            "Can not get response: " + a.message), null
    }
};
goog.net.XhrIo.prototype.getResponseHeader = function(a) {
    return this.xhr_ && this.isComplete() ? this.xhr_.getResponseHeader(a) : void 0
};
goog.net.XhrIo.prototype.getAllResponseHeaders = function() {
    return this.xhr_ && this.isComplete() ? this.xhr_.getAllResponseHeaders() : ""
};
goog.net.XhrIo.prototype.getResponseHeaders = function() {
    for (var a = {}, b = this.getAllResponseHeaders().split("\r\n"), c = 0; c < b.length; c++)
        if (!goog.string.isEmptyOrWhitespace(b[c])) {
            var d = goog.string.splitLimit(b[c], ": ", 2);
            a[d[0]] = a[d[0]] ? a[d[0]] + (", " + d[1]) : d[1]
        }
    return a
};
goog.net.XhrIo.prototype.getLastErrorCode = function() {
    return this.lastErrorCode_
};
goog.net.XhrIo.prototype.getLastError = function() {
    return goog.isString(this.lastError_) ? this.lastError_ : String(this.lastError_)
};
goog.net.XhrIo.prototype.formatMsg_ = function(a) {
    return a + " [" + this.lastMethod_ + " " + this.lastUri_ + " " + this.getStatus() + "]"
};
goog.debug.entryPointRegistry.register(function(a) {
    goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = a(goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_)
});
goog.dom.classlist = {};
goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST = !1;
goog.dom.classlist.get = function(a) {
    if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || a.classList) return a.classList;
    a = a.className;
    return goog.isString(a) && a.match(/\S+/g) || []
};
goog.dom.classlist.set = function(a, b) {
    a.className = b
};
goog.dom.classlist.contains = function(a, b) {
    return goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || a.classList ? a.classList.contains(b) : goog.array.contains(goog.dom.classlist.get(a), b)
};
goog.dom.classlist.add = function(a, b) {
    goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || a.classList ? a.classList.add(b) : goog.dom.classlist.contains(a, b) || (a.className += 0 < a.className.length ? " " + b : b)
};
goog.dom.classlist.addAll = function(a, b) {
    if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || a.classList) goog.array.forEach(b, function(b) {
        goog.dom.classlist.add(a, b)
    });
    else {
        var c = {};
        goog.array.forEach(goog.dom.classlist.get(a), function(a) {
            c[a] = !0
        });
        goog.array.forEach(b, function(a) {
            c[a] = !0
        });
        a.className = "";
        for (var d in c) a.className += 0 < a.className.length ? " " + d : d
    }
};
goog.dom.classlist.remove = function(a, b) {
    goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || a.classList ? a.classList.remove(b) : goog.dom.classlist.contains(a, b) && (a.className = goog.array.filter(goog.dom.classlist.get(a), function(a) {
        return a != b
    }).join(" "))
};
goog.dom.classlist.removeAll = function(a, b) {
    goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || a.classList ? goog.array.forEach(b, function(b) {
        goog.dom.classlist.remove(a, b)
    }) : a.className = goog.array.filter(goog.dom.classlist.get(a), function(a) {
        return !goog.array.contains(b, a)
    }).join(" ")
};
goog.dom.classlist.enable = function(a, b, c) {
    c ? goog.dom.classlist.add(a, b) : goog.dom.classlist.remove(a, b)
};
goog.dom.classlist.enableAll = function(a, b, c) {
    (c ? goog.dom.classlist.addAll : goog.dom.classlist.removeAll)(a, b)
};
goog.dom.classlist.swap = function(a, b, c) {
    return goog.dom.classlist.contains(a, b) ? (goog.dom.classlist.remove(a, b), goog.dom.classlist.add(a, c), !0) : !1
};
goog.dom.classlist.toggle = function(a, b) {
    var c = !goog.dom.classlist.contains(a, b);
    goog.dom.classlist.enable(a, b, c);
    return c
};
goog.dom.classlist.addRemove = function(a, b, c) {
    goog.dom.classlist.remove(a, b);
    goog.dom.classlist.add(a, c)
};
goog.dom.dataset = {};
goog.dom.dataset.ALLOWED_ = !goog.userAgent.product.IE;
goog.dom.dataset.PREFIX_ = "data-";
goog.dom.dataset.set = function(a, b, c) {
    goog.dom.dataset.ALLOWED_ && a.dataset ? a.dataset[b] = c : a.setAttribute(goog.dom.dataset.PREFIX_ + goog.string.toSelectorCase(b), c)
};
goog.dom.dataset.get = function(a, b) {
    return goog.dom.dataset.ALLOWED_ && a.dataset ? b in a.dataset ? a.dataset[b] : null : a.getAttribute(goog.dom.dataset.PREFIX_ + goog.string.toSelectorCase(b))
};
goog.dom.dataset.remove = function(a, b) {
    goog.dom.dataset.ALLOWED_ && a.dataset ? delete a.dataset[b] : a.removeAttribute(goog.dom.dataset.PREFIX_ + goog.string.toSelectorCase(b))
};
goog.dom.dataset.has = function(a, b) {
    return goog.dom.dataset.ALLOWED_ && a.dataset ? b in a.dataset : a.hasAttribute ? a.hasAttribute(goog.dom.dataset.PREFIX_ + goog.string.toSelectorCase(b)) : !!a.getAttribute(goog.dom.dataset.PREFIX_ + goog.string.toSelectorCase(b))
};
goog.dom.dataset.getAll = function(a) {
    if (goog.dom.dataset.ALLOWED_ && a.dataset) return a.dataset;
    var b = {};
    a = a.attributes;
    for (var c = 0; c < a.length; ++c) {
        var d = a[c];
        if (goog.string.startsWith(d.name, goog.dom.dataset.PREFIX_)) {
            var e = goog.string.toCamelCase(d.name.substr(5));
            b[e] = d.value
        }
    }
    return b
};
goog.string.StringBuffer = function(a, b) {
    null != a && this.append.apply(this, arguments)
};
goog.string.StringBuffer.prototype.buffer_ = "";
goog.string.StringBuffer.prototype.set = function(a) {
    this.buffer_ = "" + a
};
goog.string.StringBuffer.prototype.append = function(a, b, c) {
    this.buffer_ += a;
    if (null != b)
        for (var d = 1; d < arguments.length; d++) this.buffer_ += arguments[d];
    return this
};
goog.string.StringBuffer.prototype.clear = function() {
    this.buffer_ = ""
};
goog.string.StringBuffer.prototype.getLength = function() {
    return this.buffer_.length
};
goog.string.StringBuffer.prototype.toString = function() {
    return this.buffer_
};
goog.html.legacyconversions = {};
goog.html.legacyconversions.ALLOW_LEGACY_CONVERSIONS = !0;
goog.html.legacyconversions.safeHtmlFromString = function(a) {
    goog.html.legacyconversions.throwIfConversionsDisallowed();
    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(a, null)
};
goog.html.legacyconversions.safeStyleFromString = function(a) {
    goog.html.legacyconversions.throwIfConversionsDisallowed();
    return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(a)
};
goog.html.legacyconversions.trustedResourceUrlFromString = function(a) {
    goog.html.legacyconversions.throwIfConversionsDisallowed();
    return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(a)
};
goog.html.legacyconversions.safeUrlFromString = function(a) {
    goog.html.legacyconversions.throwIfConversionsDisallowed();
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
};
goog.html.legacyconversions.reportCallback_ = goog.nullFunction;
goog.html.legacyconversions.setReportCallback = function(a) {
    goog.html.legacyconversions.reportCallback_ = a
};
goog.html.legacyconversions.throwIfConversionsDisallowed = function() {
    if (!goog.html.legacyconversions.ALLOW_LEGACY_CONVERSIONS) throw Error("Error: Legacy conversion from string to goog.html types is disabled");
    goog.html.legacyconversions.reportCallback_()
};
goog.dom.classes = {};
goog.dom.classes.set = function(a, b) {
    a.className = b
};
goog.dom.classes.get = function(a) {
    a = a.className;
    return goog.isString(a) && a.match(/\S+/g) || []
};
goog.dom.classes.add = function(a, b) {
    var c = goog.dom.classes.get(a),
        d = goog.array.slice(arguments, 1),
        e = c.length + d.length;
    goog.dom.classes.add_(c, d);
    goog.dom.classes.set(a, c.join(" "));
    return c.length == e
};
goog.dom.classes.remove = function(a, b) {
    var c = goog.dom.classes.get(a),
        d = goog.array.slice(arguments, 1),
        e = goog.dom.classes.getDifference_(c, d);
    goog.dom.classes.set(a, e.join(" "));
    return e.length == c.length - d.length
};
goog.dom.classes.add_ = function(a, b) {
    for (var c = 0; c < b.length; c++) goog.array.contains(a, b[c]) || a.push(b[c])
};
goog.dom.classes.getDifference_ = function(a, b) {
    return goog.array.filter(a, function(a) {
        return !goog.array.contains(b, a)
    })
};
goog.dom.classes.swap = function(a, b, c) {
    for (var d = goog.dom.classes.get(a), e = !1, f = 0; f < d.length; f++) d[f] == b && (goog.array.splice(d, f--, 1), e = !0);
    e && (d.push(c), goog.dom.classes.set(a, d.join(" ")));
    return e
};
goog.dom.classes.addRemove = function(a, b, c) {
    var d = goog.dom.classes.get(a);
    goog.isString(b) ? goog.array.remove(d, b) : goog.isArray(b) && (d = goog.dom.classes.getDifference_(d, b));
    goog.isString(c) && !goog.array.contains(d, c) ? d.push(c) : goog.isArray(c) && goog.dom.classes.add_(d, c);
    goog.dom.classes.set(a, d.join(" "))
};
goog.dom.classes.has = function(a, b) {
    return goog.array.contains(goog.dom.classes.get(a), b)
};
goog.dom.classes.enable = function(a, b, c) {
    c ? goog.dom.classes.add(a, b) : goog.dom.classes.remove(a, b)
};
goog.dom.classes.toggle = function(a, b) {
    var c = !goog.dom.classes.has(a, b);
    goog.dom.classes.enable(a, b, c);
    return c
};
goog.i18n.BidiFormatter = function(a, b) {
    this.contextDir_ = goog.i18n.bidi.toDir(a, !0);
    this.alwaysSpan_ = !!b
};
goog.i18n.BidiFormatter.prototype.getContextDir = function() {
    return this.contextDir_
};
goog.i18n.BidiFormatter.prototype.getAlwaysSpan = function() {
    return this.alwaysSpan_
};
goog.i18n.BidiFormatter.prototype.setContextDir = function(a) {
    this.contextDir_ = goog.i18n.bidi.toDir(a, !0)
};
goog.i18n.BidiFormatter.prototype.setAlwaysSpan = function(a) {
    this.alwaysSpan_ = a
};
goog.i18n.BidiFormatter.prototype.estimateDirection = goog.i18n.bidi.estimateDirection;
goog.i18n.BidiFormatter.prototype.areDirectionalitiesOpposite_ = function(a, b) {
    return 0 > a * b
};
goog.i18n.BidiFormatter.prototype.dirResetIfNeeded_ = function(a, b, c, d) {
    return d && (this.areDirectionalitiesOpposite_(b, this.contextDir_) || this.contextDir_ == goog.i18n.bidi.Dir.LTR && goog.i18n.bidi.endsWithRtl(a, c) || this.contextDir_ == goog.i18n.bidi.Dir.RTL && goog.i18n.bidi.endsWithLtr(a, c)) ? this.contextDir_ == goog.i18n.bidi.Dir.LTR ? goog.i18n.bidi.Format.LRM : goog.i18n.bidi.Format.RLM : ""
};
goog.i18n.BidiFormatter.prototype.dirAttrValue = function(a, b) {
    return this.knownDirAttrValue(this.estimateDirection(a, b))
};
goog.i18n.BidiFormatter.prototype.knownDirAttrValue = function(a) {
    return (a == goog.i18n.bidi.Dir.NEUTRAL ? this.contextDir_ : a) == goog.i18n.bidi.Dir.RTL ? "rtl" : "ltr"
};
goog.i18n.BidiFormatter.prototype.dirAttr = function(a, b) {
    return this.knownDirAttr(this.estimateDirection(a, b))
};
goog.i18n.BidiFormatter.prototype.knownDirAttr = function(a) {
    return a != this.contextDir_ ? a == goog.i18n.bidi.Dir.RTL ? 'dir="rtl"' : a == goog.i18n.bidi.Dir.LTR ? 'dir="ltr"' : "" : ""
};
goog.i18n.BidiFormatter.prototype.spanWrapSafeHtml = function(a, b) {
    return this.spanWrapSafeHtmlWithKnownDir(null, a, b)
};
goog.i18n.BidiFormatter.prototype.spanWrap = function(a, b, c) {
    return this.spanWrapWithKnownDir(null, a, b, c)
};
goog.i18n.BidiFormatter.prototype.spanWrapSafeHtmlWithKnownDir = function(a, b, c) {
    null == a && (a = this.estimateDirection(goog.html.SafeHtml.unwrap(b), !0));
    return this.spanWrapWithKnownDir_(a, b, c)
};
goog.i18n.BidiFormatter.prototype.spanWrapWithKnownDir = function(a, b, c, d) {
    b = c ? goog.html.legacyconversions.safeHtmlFromString(b) : goog.html.SafeHtml.htmlEscape(b);
    return goog.html.SafeHtml.unwrap(this.spanWrapSafeHtmlWithKnownDir(a, b, d))
};
goog.i18n.BidiFormatter.prototype.spanWrapWithKnownDir_ = function(a, b, c) {
    c = c || void 0 == c;
    var d;
    d = a != goog.i18n.bidi.Dir.NEUTRAL && a != this.contextDir_;
    if (this.alwaysSpan_ || d) {
        var e;
        d && (e = a == goog.i18n.bidi.Dir.RTL ? "rtl" : "ltr");
        d = goog.html.SafeHtml.create("span", {
            dir: e
        }, b)
    } else d = b;
    b = goog.html.SafeHtml.unwrap(b);
    return d = goog.html.SafeHtml.concatWithDir(goog.i18n.bidi.Dir.NEUTRAL, d, this.dirResetIfNeeded_(b, a, !0, c))
};
goog.i18n.BidiFormatter.prototype.unicodeWrap = function(a, b, c) {
    return this.unicodeWrapWithKnownDir(null, a, b, c)
};
goog.i18n.BidiFormatter.prototype.unicodeWrapWithKnownDir = function(a, b, c, d) {
    null == a && (a = this.estimateDirection(b, c));
    return this.unicodeWrapWithKnownDir_(a, b, c, d)
};
goog.i18n.BidiFormatter.prototype.unicodeWrapWithKnownDir_ = function(a, b, c, d) {
    d = d || void 0 == d;
    var e = [];
    a != goog.i18n.bidi.Dir.NEUTRAL && a != this.contextDir_ ? (e.push(a == goog.i18n.bidi.Dir.RTL ? goog.i18n.bidi.Format.RLE : goog.i18n.bidi.Format.LRE), e.push(b), e.push(goog.i18n.bidi.Format.PDF)) : e.push(b);
    e.push(this.dirResetIfNeeded_(b, a, c, d));
    return e.join("")
};
goog.i18n.BidiFormatter.prototype.markAfter = function(a, b) {
    return this.markAfterKnownDir(null, a, b)
};
goog.i18n.BidiFormatter.prototype.markAfterKnownDir = function(a, b, c) {
    null == a && (a = this.estimateDirection(b, c));
    return this.dirResetIfNeeded_(b, a, c, !0)
};
goog.i18n.BidiFormatter.prototype.mark = function() {
    switch (this.contextDir_) {
        case goog.i18n.bidi.Dir.LTR:
            return goog.i18n.bidi.Format.LRM;
        case goog.i18n.bidi.Dir.RTL:
            return goog.i18n.bidi.Format.RLM;
        default:
            return ""
    }
};
goog.i18n.BidiFormatter.prototype.startEdge = function() {
    return this.contextDir_ == goog.i18n.bidi.Dir.RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT
};
goog.i18n.BidiFormatter.prototype.endEdge = function() {
    return this.contextDir_ == goog.i18n.bidi.Dir.RTL ? goog.i18n.bidi.LEFT : goog.i18n.bidi.RIGHT
};
goog.structs.InversionMap = function(a, b, c) {
    this.rangeArray = null;
    if (a.length != b.length) return null;
    this.storeInversion_(a, c);
    this.values = b
};
goog.structs.InversionMap.prototype.storeInversion_ = function(a, b) {
    this.rangeArray = a;
    for (var c = 1; c < a.length; c++) null == a[c] ? a[c] = a[c - 1] + 1 : b && (a[c] += a[c - 1])
};
goog.structs.InversionMap.prototype.spliceInversion = function(a, b, c) {
    a = new goog.structs.InversionMap(a, b, c);
    b = a.rangeArray[0];
    var d = goog.array.peek(a.rangeArray);
    c = this.getLeast(b);
    d = this.getLeast(d);
    b != this.rangeArray[c] && c++;
    this.rangeArray = this.rangeArray.slice(0, c).concat(a.rangeArray).concat(this.rangeArray.slice(d + 1));
    this.values = this.values.slice(0, c).concat(a.values).concat(this.values.slice(d + 1))
};
goog.structs.InversionMap.prototype.at = function(a) {
    a = this.getLeast(a);
    return 0 > a ? null : this.values[a]
};
goog.structs.InversionMap.prototype.getLeast = function(a) {
    for (var b = this.rangeArray, c = 0, d = b.length; 8 < d - c;) {
        var e = d + c >> 1;
        b[e] <= a ? c = e : d = e
    }
    for (; c < d && !(a < b[c]); ++c);
    return c - 1
};
goog.i18n.GraphemeBreak = {};
goog.i18n.GraphemeBreak.property = {
    ANY: 0,
    CONTROL: 1,
    EXTEND: 2,
    PREPEND: 3,
    SPACING_MARK: 4,
    INDIC_CONSONANT: 5,
    VIRAMA: 6,
    L: 7,
    V: 8,
    T: 9,
    LV: 10,
    LVT: 11,
    CR: 12,
    LF: 13,
    REGIONAL_INDICATOR: 14
};
goog.i18n.GraphemeBreak.inversions_ = null;
goog.i18n.GraphemeBreak.applyLegacyBreakRules_ = function(a, b) {
    var c = goog.i18n.GraphemeBreak.property;
    return a == c.CR && b == c.LF ? !1 : a == c.CONTROL || a == c.CR || a == c.LF || b == c.CONTROL || b == c.CR || b == c.LF ? !0 : a == c.L && (b == c.L || b == c.V || b == c.LV || b == c.LVT) || !(a != c.LV && a != c.V || b != c.V && b != c.T) || (a == c.LVT || a == c.T) && b == c.T || b == c.EXTEND || b == c.VIRAMA || a == c.VIRAMA && b == c.INDIC_CONSONANT ? !1 : !0
};
goog.i18n.GraphemeBreak.getBreakProp_ = function(a) {
    if (44032 <= a && 55203 >= a) {
        var b = goog.i18n.GraphemeBreak.property;
        return 16 == a % 28 ? b.LV : b.LVT
    }
    goog.i18n.GraphemeBreak.inversions_ || (goog.i18n.GraphemeBreak.inversions_ = new goog.structs.InversionMap([0, 10, 1, 2, 1, 18, 95, 33, 13, 1, 594, 112, 275, 7, 263, 45, 1, 1, 1, 2, 1, 2, 1, 1, 56, 5, 11, 11, 48, 21, 16, 1, 101, 7, 1, 1, 6, 2, 2, 1, 4, 33, 1, 1, 1, 30, 27, 91, 11, 58, 9, 34, 4, 1, 9, 1, 3, 1, 5, 43, 3, 136, 31, 1, 17, 37, 1, 1, 1, 1, 3, 8, 4, 1, 2, 1, 7, 8, 2, 2, 21, 8, 1, 2, 17, 39, 1, 1, 1, 2, 6, 6, 1, 9, 5, 4, 2, 2, 12, 2, 15, 2, 1, 17, 39, 2, 3, 12,
        4, 8, 6, 17, 2, 3, 14, 1, 17, 39, 1, 1, 3, 8, 4, 1, 20, 2, 29, 1, 2, 17, 39, 1, 1, 2, 1, 6, 6, 9, 6, 4, 2, 2, 13, 1, 16, 1, 18, 41, 1, 1, 1, 12, 1, 9, 1, 41, 3, 17, 37, 4, 3, 5, 7, 8, 3, 2, 8, 2, 30, 2, 17, 39, 1, 1, 1, 1, 2, 1, 3, 1, 5, 1, 8, 9, 1, 3, 2, 30, 2, 17, 38, 3, 1, 2, 5, 7, 1, 9, 1, 10, 2, 30, 2, 22, 48, 5, 1, 2, 6, 7, 19, 2, 13, 46, 2, 1, 1, 1, 6, 1, 12, 8, 50, 46, 2, 1, 1, 1, 9, 11, 6, 14, 2, 58, 2, 27, 1, 1, 1, 1, 1, 4, 2, 49, 14, 1, 4, 1, 1, 2, 5, 48, 9, 1, 57, 33, 12, 4, 1, 6, 1, 2, 2, 2, 1, 16, 2, 4, 2, 2, 4, 3, 1, 3, 2, 7, 3, 4, 13, 1, 1, 1, 2, 6, 1, 1, 14, 1, 98, 96, 72, 88, 349, 3, 931, 15, 2, 1, 14, 15, 2, 1, 14, 15, 2, 15, 15, 14, 35, 17, 2, 1, 7, 8, 1, 2, 9, 1, 1, 9, 1, 45, 3, 155, 1, 87,
        31, 3, 4, 2, 9, 1, 6, 3, 20, 19, 29, 44, 9, 3, 2, 1, 69, 23, 2, 3, 4, 45, 6, 2, 1, 1, 1, 8, 1, 1, 1, 2, 8, 6, 13, 128, 4, 1, 14, 33, 1, 1, 5, 1, 1, 5, 1, 1, 1, 7, 31, 9, 12, 2, 1, 7, 23, 1, 4, 2, 2, 2, 2, 2, 11, 3, 2, 36, 2, 1, 1, 2, 3, 1, 1, 3, 2, 12, 36, 8, 8, 2, 2, 21, 3, 128, 3, 1, 13, 1, 7, 4, 1, 4, 2, 1, 203, 64, 523, 1, 2, 2, 24, 7, 49, 16, 96, 33, 3070, 3, 141, 1, 96, 32, 554, 6, 105, 2, 30164, 4, 1, 10, 33, 1, 80, 2, 272, 1, 3, 1, 4, 1, 23, 2, 2, 1, 24, 30, 4, 4, 3, 8, 1, 1, 13, 2, 16, 34, 16, 1, 27, 18, 24, 24, 4, 8, 2, 23, 11, 1, 1, 12, 32, 3, 1, 5, 3, 3, 36, 1, 2, 4, 2, 1, 3, 1, 69, 35, 6, 2, 2, 2, 2, 12, 1, 8, 1, 1, 18, 16, 1, 3, 6, 1, 5, 48, 1, 1, 3, 2, 2, 5, 2, 1, 1, 32, 9, 1, 2, 2, 5, 1,
        1, 201, 14, 2, 1, 1, 9, 8, 2, 1, 2, 1, 2, 1, 1, 1, 18, 11184, 27, 49, 1028, 1024, 6942, 1, 737, 16, 16, 7, 216, 1, 158, 2, 89, 3, 513, 1, 2051, 15, 40, 7, 1, 1472, 1, 1, 1, 53, 14, 1, 57, 2, 1, 45, 3, 4, 2, 1, 1, 2, 1, 66, 3, 36, 5, 1, 6, 2, 75, 2, 1, 48, 3, 9, 1, 1, 1258, 1, 1, 1, 2, 6, 1, 1, 22681, 62, 4, 25042, 1, 1, 3, 3, 1, 5, 8, 8, 2, 7, 30, 4, 148, 3, 8097, 26, 790017, 255
    ], [1, 13, 1, 12, 1, 0, 1, 0, 1, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 1, 0, 2, 0, 2, 0, 2, 0, 2, 1, 0, 2, 0, 2, 0, 2, 0, 1, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 4, 0, 5, 2, 4, 2, 0, 4, 2, 4, 6, 4, 0, 2, 5, 0, 2, 0, 5, 2, 4, 0, 5, 2, 0, 2, 4, 2, 4, 6, 0, 2, 5, 0, 2, 0, 5, 0, 2, 4, 0, 5, 2, 4, 2, 6, 2,
        5, 0, 2, 0, 2, 4, 0, 5, 2, 0, 4, 2, 4, 6, 0, 2, 0, 2, 4, 0, 5, 2, 0, 2, 4, 2, 4, 6, 2, 5, 0, 2, 0, 5, 0, 2, 0, 5, 2, 4, 2, 4, 6, 0, 2, 0, 4, 0, 5, 0, 2, 4, 2, 6, 2, 5, 0, 2, 0, 4, 0, 5, 2, 0, 4, 2, 4, 2, 4, 2, 4, 2, 6, 2, 5, 0, 2, 0, 4, 0, 5, 0, 2, 4, 2, 4, 6, 0, 2, 0, 2, 0, 4, 0, 5, 6, 2, 4, 2, 4, 2, 4, 0, 5, 0, 2, 0, 4, 2, 6, 0, 2, 0, 5, 0, 2, 0, 4, 2, 0, 2, 0, 5, 0, 2, 0, 2, 0, 2, 0, 2, 0, 4, 5, 2, 4, 2, 6, 0, 2, 0, 2, 0, 2, 0, 5, 0, 2, 4, 2, 0, 6, 4, 2, 5, 0, 5, 0, 4, 2, 5, 2, 5, 0, 5, 0, 5, 2, 5, 2, 0, 4, 2, 0, 2, 5, 0, 2, 0, 7, 8, 9, 0, 2, 0, 5, 2, 6, 0, 5, 2, 6, 0, 5, 2, 0, 5, 2, 5, 0, 2, 4, 2, 4, 2, 4, 2, 6, 2, 0, 2, 0, 2, 0, 2, 0, 5, 2, 4, 2, 4, 2, 4, 2, 0, 5, 0, 5, 0, 4, 0, 4, 0, 5, 2, 4, 0, 5, 0, 5, 4, 2, 4, 2, 6, 0, 2, 0, 2, 4, 2,
        0, 2, 4, 0, 5, 2, 4, 2, 4, 2, 4, 2, 4, 6, 5, 0, 2, 0, 2, 4, 0, 5, 4, 2, 4, 2, 6, 4, 5, 0, 5, 0, 5, 0, 2, 4, 2, 4, 2, 4, 2, 6, 0, 5, 4, 2, 4, 2, 0, 5, 0, 2, 0, 2, 4, 2, 0, 2, 0, 4, 2, 0, 2, 0, 1, 2, 1, 0, 1, 0, 1, 0, 2, 0, 2, 0, 6, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 6, 5, 2, 5, 4, 2, 4, 0, 5, 0, 5, 0, 5, 0, 5, 0, 4, 0, 5, 4, 6, 0, 2, 0, 5, 0, 2, 0, 5, 2, 4, 6, 0, 7, 2, 4, 0, 5, 0, 5, 2, 4, 2, 4, 2, 4, 6, 0, 5, 2, 4, 2, 4, 2, 0, 2, 0, 2, 4, 0, 5, 0, 5, 0, 5, 0, 5, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 5, 4, 2, 4, 0, 4, 6, 0, 5, 0, 5, 0, 5, 0, 4, 2, 4, 2, 4, 0, 4, 6, 0, 11, 8, 9, 0, 2, 0, 2, 0, 2, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0, 2, 0, 2, 6, 0, 4, 2, 4, 0, 2, 6, 0, 2, 4, 0, 4, 2, 4, 6, 2, 0, 1, 0, 2, 0, 2, 4, 2, 6, 0, 2, 4, 0, 4, 2, 4,
        6, 0, 2, 4, 2, 4, 2, 6, 2, 0, 4, 2, 0, 2, 4, 2, 0, 4, 2, 1, 2, 0, 2, 0, 2, 0, 2, 0, 14, 0, 1, 2
    ], !0));
    return goog.i18n.GraphemeBreak.inversions_.at(a)
};
goog.i18n.GraphemeBreak.hasGraphemeBreak = function(a, b, c) {
    a = goog.i18n.GraphemeBreak.getBreakProp_(a);
    b = goog.i18n.GraphemeBreak.getBreakProp_(b);
    var d = goog.i18n.GraphemeBreak.property;
    return goog.i18n.GraphemeBreak.applyLegacyBreakRules_(a, b) && !(c && (a == d.PREPEND || b == d.SPACING_MARK))
};
goog.async.Debouncer = function(a, b, c) {
    goog.Disposable.call(this);
    this.listener_ = null != c ? goog.bind(a, c) : a;
    this.interval_ = b;
    this.callback_ = goog.bind(this.onTimer_, this);
    this.shouldFire_ = !1;
    this.pauseCount_ = 0;
    this.timer_ = null;
    this.args_ = []
};
goog.inherits(goog.async.Debouncer, goog.Disposable);
goog.async.Debouncer.prototype.fire = function(a) {
    this.stop();
    this.args_ = arguments;
    this.timer_ = goog.Timer.callOnce(this.callback_, this.interval_)
};
goog.async.Debouncer.prototype.stop = function() {
    this.timer_ && (goog.Timer.clear(this.timer_), this.timer_ = null);
    this.shouldFire_ = !1;
    this.args_ = []
};
goog.async.Debouncer.prototype.pause = function() {
    ++this.pauseCount_
};
goog.async.Debouncer.prototype.resume = function() {
    this.pauseCount_ && (--this.pauseCount_, !this.pauseCount_ && this.shouldFire_ && this.doAction_())
};
goog.async.Debouncer.prototype.disposeInternal = function() {
    this.stop();
    goog.async.Debouncer.superClass_.disposeInternal.call(this)
};
goog.async.Debouncer.prototype.onTimer_ = function() {
    this.timer_ = null;
    this.pauseCount_ ? this.shouldFire_ = !0 : this.doAction_()
};
goog.async.Debouncer.prototype.doAction_ = function() {
    this.shouldFire_ = !1;
    this.listener_.apply(null, this.args_)
};
goog.async.Throttle = function(a, b, c) {
    goog.Disposable.call(this);
    this.listener_ = null != c ? goog.bind(a, c) : a;
    this.interval_ = b;
    this.callback_ = goog.bind(this.onTimer_, this);
    this.args_ = []
};
goog.inherits(goog.async.Throttle, goog.Disposable);
goog.Throttle = goog.async.Throttle;
goog.async.Throttle.prototype.shouldFire_ = !1;
goog.async.Throttle.prototype.pauseCount_ = 0;
goog.async.Throttle.prototype.timer_ = null;
goog.async.Throttle.prototype.fire = function(a) {
    this.args_ = arguments;
    this.timer_ || this.pauseCount_ ? this.shouldFire_ = !0 : this.doAction_()
};
goog.async.Throttle.prototype.stop = function() {
    this.timer_ && (goog.Timer.clear(this.timer_), this.timer_ = null, this.shouldFire_ = !1, this.args_ = [])
};
goog.async.Throttle.prototype.pause = function() {
    this.pauseCount_++
};
goog.async.Throttle.prototype.resume = function() {
    this.pauseCount_--;
    this.pauseCount_ || !this.shouldFire_ || this.timer_ || (this.shouldFire_ = !1, this.doAction_())
};
goog.async.Throttle.prototype.disposeInternal = function() {
    goog.async.Throttle.superClass_.disposeInternal.call(this);
    this.stop()
};
goog.async.Throttle.prototype.onTimer_ = function() {
    this.timer_ = null;
    this.shouldFire_ && !this.pauseCount_ && (this.shouldFire_ = !1, this.doAction_())
};
goog.async.Throttle.prototype.doAction_ = function() {
    this.timer_ = goog.Timer.callOnce(this.callback_, this.interval_);
    this.listener_.apply(null, this.args_)
};
goog.format = {};
goog.format.fileSize = function(a, b) {
    return goog.format.numBytesToString(a, b, !1)
};
goog.format.isConvertableScaledNumber = function(a) {
    return goog.format.SCALED_NUMERIC_RE_.test(a)
};
goog.format.stringToNumericValue = function(a) {
    return goog.string.endsWith(a, "B") ? goog.format.stringToNumericValue_(a, goog.format.NUMERIC_SCALES_BINARY_) : goog.format.stringToNumericValue_(a, goog.format.NUMERIC_SCALES_SI_)
};
goog.format.stringToNumBytes = function(a) {
    return goog.format.stringToNumericValue_(a, goog.format.NUMERIC_SCALES_BINARY_)
};
goog.format.numericValueToString = function(a, b) {
    return goog.format.numericValueToString_(a, goog.format.NUMERIC_SCALES_SI_, b)
};
goog.format.numBytesToString = function(a, b, c, d) {
    var e = "";
    if (!goog.isDef(c) || c) e = "B";
    return goog.format.numericValueToString_(a, goog.format.NUMERIC_SCALES_BINARY_, b, e, d)
};
goog.format.stringToNumericValue_ = function(a, b) {
    var c = a.match(goog.format.SCALED_NUMERIC_RE_);
    return c ? Number(c[1]) * b[c[2]] : NaN
};
goog.format.numericValueToString_ = function(a, b, c, d, e) {
    var f = goog.format.NUMERIC_SCALE_PREFIXES_,
        g = a,
        h = "",
        k = "",
        l = 1;
    0 > a && (a = -a);
    for (var n = 0; n < f.length; n++) {
        var m = f[n],
            l = b[m];
        if (a >= l || 1 >= l && a > .1 * l) {
            h = m;
            break
        }
    }
    h ? (d && (h += d), e && (k = " ")) : l = 1;
    a = Math.pow(10, goog.isDef(c) ? c : 2);
    return Math.round(g / l * a) / a + k + h
};
goog.format.SCALED_NUMERIC_RE_ = /^([-]?\d+\.?\d*)([K,M,G,T,P,k,m,u,n]?)[B]?$/;
goog.format.NUMERIC_SCALE_PREFIXES_ = "P T G M K  m u n".split(" ");
goog.format.NUMERIC_SCALES_SI_ = {
    "": 1,
    n: 1E-9,
    u: 1E-6,
    m: .001,
    k: 1E3,
    K: 1E3,
    M: 1E6,
    G: 1E9,
    T: 1E12,
    P: 1E15
};
goog.format.NUMERIC_SCALES_BINARY_ = {
    "": 1,
    n: Math.pow(1024, -3),
    u: Math.pow(1024, -2),
    m: 1 / 1024,
    k: 1024,
    K: 1024,
    M: Math.pow(1024, 2),
    G: Math.pow(1024, 3),
    T: Math.pow(1024, 4),
    P: Math.pow(1024, 5)
};
goog.format.FIRST_GRAPHEME_EXTEND_ = 768;
goog.format.isTreatedAsBreakingSpace_ = function(a) {
    return a <= goog.format.WbrToken_.SPACE || 4096 <= a && (8192 <= a && 8198 >= a || 8200 <= a && 8203 >= a || 5760 == a || 6158 == a || 8232 == a || 8233 == a || 8287 == a || 12288 == a)
};
goog.format.isInvisibleFormattingCharacter_ = function(a) {
    return 8204 <= a && 8207 >= a || 8234 <= a && 8238 >= a
};
goog.format.insertWordBreaksGeneric_ = function(a, b, c) {
    c = c || 10;
    if (c > a.length) return a;
    for (var d = [], e = 0, f = 0, g = 0, h = 0, k = 0; k < a.length; k++) {
        var l = h,
            h = a.charCodeAt(k),
            l = h >= goog.format.FIRST_GRAPHEME_EXTEND_ && !b(l, h, !0);
        e >= c && !goog.format.isTreatedAsBreakingSpace_(h) && !l && (d.push(a.substring(g, k), goog.format.WORD_BREAK_HTML), g = k, e = 0);
        f ? h == goog.format.WbrToken_.GT && f == goog.format.WbrToken_.LT ? f = 0 : h == goog.format.WbrToken_.SEMI_COLON && f == goog.format.WbrToken_.AMP && (f = 0, e++) : h == goog.format.WbrToken_.LT || h == goog.format.WbrToken_.AMP ?
            f = h : goog.format.isTreatedAsBreakingSpace_(h) ? e = 0 : goog.format.isInvisibleFormattingCharacter_(h) || e++
    }
    d.push(a.substr(g));
    return d.join("")
};
goog.format.insertWordBreaks = function(a, b) {
    return goog.format.insertWordBreaksGeneric_(a, goog.i18n.GraphemeBreak.hasGraphemeBreak, b)
};
goog.format.conservativelyHasGraphemeBreak_ = function(a, b, c) {
    return 1024 <= b && 1315 > b
};
goog.format.insertWordBreaksBasic = function(a, b) {
    return goog.format.insertWordBreaksGeneric_(a, goog.format.conservativelyHasGraphemeBreak_, b)
};
goog.format.IS_IE8_OR_ABOVE_ = goog.userAgent.IE && goog.userAgent.isVersionOrHigher(8);
goog.format.WORD_BREAK_HTML = goog.userAgent.WEBKIT ? "<wbr></wbr>" : goog.userAgent.OPERA ? "&shy;" : goog.format.IS_IE8_OR_ABOVE_ ? "&#8203;" : "<wbr>";
goog.format.WbrToken_ = {
    LT: 60,
    GT: 62,
    AMP: 38,
    SEMI_COLON: 59,
    SPACE: 32
};
goog.soy = {};
goog.soy.data = {};
goog.soy.data.SanitizedContentKind = {
    HTML: goog.DEBUG ? {
        sanitizedContentKindHtml: !0
    } : {},
    JS: goog.DEBUG ? {
        sanitizedContentJsChars: !0
    } : {},
    URI: goog.DEBUG ? {
        sanitizedContentUri: !0
    } : {},
    TRUSTED_RESOURCE_URI: goog.DEBUG ? {
        sanitizedContentTrustedResourceUri: !0
    } : {},
    ATTRIBUTES: goog.DEBUG ? {
        sanitizedContentHtmlAttribute: !0
    } : {},
    CSS: goog.DEBUG ? {
        sanitizedContentCss: !0
    } : {},
    TEXT: goog.DEBUG ? {
        sanitizedContentKindText: !0
    } : {}
};
goog.soy.data.SanitizedContent = function() {
    throw Error("Do not instantiate directly");
};
goog.soy.data.SanitizedContent.prototype.contentDir = null;
goog.soy.data.SanitizedContent.prototype.getContent = function() {
    return this.content
};
goog.soy.data.SanitizedContent.prototype.toString = function() {
    return this.content
};
goog.soy.data.SanitizedContent.prototype.toSafeHtml = function() {
    if (this.contentKind === goog.soy.data.SanitizedContentKind.TEXT) return goog.html.SafeHtml.htmlEscape(this.toString());
    if (this.contentKind !== goog.soy.data.SanitizedContentKind.HTML) throw Error("Sanitized content was not of kind TEXT or HTML.");
    return goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract(goog.string.Const.from("Soy SanitizedContent of kind HTML produces SafeHtml-contract-compliant value."), this.toString(),
        this.contentDir)
};
goog.soy.data.UnsanitizedText = function() {
    goog.soy.data.SanitizedContent.call(this)
};
goog.inherits(goog.soy.data.UnsanitizedText, goog.soy.data.SanitizedContent);
goog.soy.REQUIRE_STRICT_AUTOESCAPE = !1;
goog.soy.renderHtml = function(a, b) {
    a.innerHTML = goog.soy.ensureTemplateOutputHtml_(b)
};
goog.soy.renderElement = function(a, b, c, d) {
    goog.asserts.assert(b, "Soy template may not be null.");
    a.innerHTML = goog.soy.ensureTemplateOutputHtml_(b(c || goog.soy.defaultTemplateData_, void 0, d))
};
goog.soy.renderAsFragment = function(a, b, c, d) {
    goog.asserts.assert(a, "Soy template may not be null.");
    d = d || goog.dom.getDomHelper();
    a = goog.soy.ensureTemplateOutputHtml_(a(b || goog.soy.defaultTemplateData_, void 0, c));
    goog.soy.assertFirstTagValid_(a);
    return d.htmlToDocumentFragment(a)
};
goog.soy.renderAsElement = function(a, b, c, d) {
    goog.asserts.assert(a, "Soy template may not be null.");
    return goog.soy.convertToElement_(a(b || goog.soy.defaultTemplateData_, void 0, c), d)
};
goog.soy.convertToElement = function(a, b) {
    return goog.soy.convertToElement_(a, b)
};
goog.soy.convertToElement_ = function(a, b) {
    var c = (b || goog.dom.getDomHelper()).createElement(goog.dom.TagName.DIV),
        d = goog.soy.ensureTemplateOutputHtml_(a);
    goog.soy.assertFirstTagValid_(d);
    c.innerHTML = d;
    return 1 == c.childNodes.length && (d = c.firstChild, d.nodeType == goog.dom.NodeType.ELEMENT) ? d : c
};
goog.soy.ensureTemplateOutputHtml_ = function(a) {
    if (!goog.soy.REQUIRE_STRICT_AUTOESCAPE && !goog.isObject(a)) return String(a);
    if (a instanceof goog.soy.data.SanitizedContent) {
        var b = goog.soy.data.SanitizedContentKind;
        if (a.contentKind === b.HTML) return goog.asserts.assertString(a.getContent());
        if (a.contentKind === b.TEXT) return goog.string.htmlEscape(a.getContent())
    }
    goog.asserts.fail("Soy template output is unsafe for use as HTML: " + a);
    return "zSoyz"
};
goog.soy.assertFirstTagValid_ = function(a) {
    if (goog.asserts.ENABLE_ASSERTS) {
        var b = a.match(goog.soy.INVALID_TAG_TO_RENDER_);
        goog.asserts.assert(!b, "This template starts with a %s, which cannot be a child of a <div>, as required by soy internals. Consider using goog.soy.renderElement instead.\nTemplate output: %s", b && b[0], a)
    }
};
goog.soy.INVALID_TAG_TO_RENDER_ = /^<(body|caption|col|colgroup|head|html|tr|td|th|tbody|thead|tfoot)>/i;
goog.soy.defaultTemplateData_ = {};
var soy = {
        esc: {}
    },
    soydata = {
        SanitizedJsStrChars: {},
        VERY_UNSAFE: {}
    };
soy.StringBuilder = goog.string.StringBuffer;
soydata.SanitizedContentKind = goog.soy.data.SanitizedContentKind;
soydata.isContentKind = function(a, b) {
    return null != a && a.contentKind === b
};
soydata.getContentDir = function(a) {
    if (null != a) switch (a.contentDir) {
        case goog.i18n.bidi.Dir.LTR:
            return goog.i18n.bidi.Dir.LTR;
        case goog.i18n.bidi.Dir.RTL:
            return goog.i18n.bidi.Dir.RTL;
        case goog.i18n.bidi.Dir.NEUTRAL:
            return goog.i18n.bidi.Dir.NEUTRAL
    }
    return null
};
soydata.SanitizedHtml = function() {
    goog.soy.data.SanitizedContent.call(this)
};
goog.inherits(soydata.SanitizedHtml, goog.soy.data.SanitizedContent);
soydata.SanitizedHtml.prototype.contentKind = soydata.SanitizedContentKind.HTML;
soydata.SanitizedHtml.from = function(a) {
    return null != a && a.contentKind === soydata.SanitizedContentKind.HTML ? (goog.asserts.assert(a.constructor === soydata.SanitizedHtml), a) : a instanceof goog.html.SafeHtml ? soydata.VERY_UNSAFE.ordainSanitizedHtml(goog.html.SafeHtml.unwrap(a), a.getDirection()) : soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.esc.$$escapeHtmlHelper(String(a)), soydata.getContentDir(a))
};
soydata.SanitizedJs = function() {
    goog.soy.data.SanitizedContent.call(this)
};
goog.inherits(soydata.SanitizedJs, goog.soy.data.SanitizedContent);
soydata.SanitizedJs.prototype.contentKind = soydata.SanitizedContentKind.JS;
soydata.SanitizedJs.prototype.contentDir = goog.i18n.bidi.Dir.LTR;
soydata.SanitizedUri = function() {
    goog.soy.data.SanitizedContent.call(this)
};
goog.inherits(soydata.SanitizedUri, goog.soy.data.SanitizedContent);
soydata.SanitizedUri.prototype.contentKind = soydata.SanitizedContentKind.URI;
soydata.SanitizedUri.prototype.contentDir = goog.i18n.bidi.Dir.LTR;
soydata.SanitizedHtmlAttribute = function() {
    goog.soy.data.SanitizedContent.call(this)
};
goog.inherits(soydata.SanitizedHtmlAttribute, goog.soy.data.SanitizedContent);
soydata.SanitizedHtmlAttribute.prototype.contentKind = soydata.SanitizedContentKind.ATTRIBUTES;
soydata.SanitizedHtmlAttribute.prototype.contentDir = goog.i18n.bidi.Dir.LTR;
soydata.SanitizedCss = function() {
    goog.soy.data.SanitizedContent.call(this)
};
goog.inherits(soydata.SanitizedCss, goog.soy.data.SanitizedContent);
soydata.SanitizedCss.prototype.contentKind = soydata.SanitizedContentKind.CSS;
soydata.SanitizedCss.prototype.contentDir = goog.i18n.bidi.Dir.LTR;
soydata.UnsanitizedText = function(a, b) {
    this.content = String(a);
    this.contentDir = null != b ? b : null
};
goog.inherits(soydata.UnsanitizedText, goog.soy.data.SanitizedContent);
soydata.UnsanitizedText.prototype.contentKind = soydata.SanitizedContentKind.TEXT;
soydata.$$EMPTY_STRING_ = {
    VALUE: ""
};
soydata.$$makeSanitizedContentFactory_ = function(a) {
    function b(a) {
        this.content = a
    }
    b.prototype = a.prototype;
    return function(a, d) {
        var e = new b(String(a));
        void 0 !== d && (e.contentDir = d);
        return e
    }
};
soydata.$$makeSanitizedContentFactoryWithDefaultDirOnly_ = function(a) {
    function b(a) {
        this.content = a
    }
    b.prototype = a.prototype;
    return function(a) {
        return new b(String(a))
    }
};
soydata.markUnsanitizedText = function(a, b) {
    return new soydata.UnsanitizedText(a, b)
};
soydata.VERY_UNSAFE.ordainSanitizedHtml = soydata.$$makeSanitizedContentFactory_(soydata.SanitizedHtml);
soydata.VERY_UNSAFE.ordainSanitizedJs = soydata.$$makeSanitizedContentFactoryWithDefaultDirOnly_(soydata.SanitizedJs);
soydata.VERY_UNSAFE.ordainSanitizedUri = soydata.$$makeSanitizedContentFactoryWithDefaultDirOnly_(soydata.SanitizedUri);
soydata.VERY_UNSAFE.ordainSanitizedHtmlAttribute = soydata.$$makeSanitizedContentFactoryWithDefaultDirOnly_(soydata.SanitizedHtmlAttribute);
soydata.VERY_UNSAFE.ordainSanitizedCss = soydata.$$makeSanitizedContentFactoryWithDefaultDirOnly_(soydata.SanitizedCss);
soy.renderElement = goog.soy.renderElement;
soy.renderAsFragment = function(a, b, c, d) {
    return goog.soy.renderAsFragment(a, b, d, new goog.dom.DomHelper(c))
};
soy.renderAsElement = function(a, b, c, d) {
    return goog.soy.renderAsElement(a, b, d, new goog.dom.DomHelper(c))
};
soy.$$IS_LOCALE_RTL = goog.i18n.bidi.IS_RTL;
soy.$$augmentMap = function(a, b) {
    function c() {}
    c.prototype = a;
    var d = new c,
        e;
    for (e in b) d[e] = b[e];
    return d
};
soy.$$checkMapKey = function(a) {
    if ("string" != typeof a) throw Error("Map literal's key expression must evaluate to string (encountered type \"" + typeof a + '").');
    return a
};
soy.$$getMapKeys = function(a) {
    var b = [],
        c;
    for (c in a) b.push(c);
    return b
};
soy.$$getDelTemplateId = function(a) {
    return a
};
soy.$$DELEGATE_REGISTRY_PRIORITIES_ = {};
soy.$$DELEGATE_REGISTRY_FUNCTIONS_ = {};
soy.$$registerDelegateFn = function(a, b, c, d) {
    var e = "key_" + a + ":" + b,
        f = soy.$$DELEGATE_REGISTRY_PRIORITIES_[e];
    if (void 0 === f || c > f) soy.$$DELEGATE_REGISTRY_PRIORITIES_[e] = c, soy.$$DELEGATE_REGISTRY_FUNCTIONS_[e] = d;
    else if (c == f) throw Error('Encountered two active delegates with the same priority ("' + a + ":" + b + '").');
};
soy.$$getDelegateFn = function(a, b, c) {
    var d = soy.$$DELEGATE_REGISTRY_FUNCTIONS_["key_" + a + ":" + b];
    d || "" == b || (d = soy.$$DELEGATE_REGISTRY_FUNCTIONS_["key_" + a + ":"]);
    if (d) return d;
    if (c) return soy.$$EMPTY_TEMPLATE_FN_;
    throw Error('Found no active impl for delegate call to "' + a + ":" + b + '" (and not allowemptydefault="true").');
};
soy.$$EMPTY_TEMPLATE_FN_ = function(a, b, c) {
    return ""
};
soydata.$$makeSanitizedContentFactoryForInternalBlocks_ = function(a) {
    function b(a) {
        this.content = a
    }
    b.prototype = a.prototype;
    return function(a, d) {
        var e = String(a);
        if (!e) return soydata.$$EMPTY_STRING_.VALUE;
        e = new b(e);
        void 0 !== d && (e.contentDir = d);
        return e
    }
};
soydata.$$makeSanitizedContentFactoryWithDefaultDirOnlyForInternalBlocks_ = function(a) {
    function b(a) {
        this.content = a
    }
    b.prototype = a.prototype;
    return function(a) {
        return (a = String(a)) ? new b(a) : soydata.$$EMPTY_STRING_.VALUE
    }
};
soydata.$$markUnsanitizedTextForInternalBlocks = function(a, b) {
    var c = String(a);
    return c ? new soydata.UnsanitizedText(c, b) : soydata.$$EMPTY_STRING_.VALUE
};
soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks = soydata.$$makeSanitizedContentFactoryForInternalBlocks_(soydata.SanitizedHtml);
soydata.VERY_UNSAFE.$$ordainSanitizedJsForInternalBlocks = soydata.$$makeSanitizedContentFactoryWithDefaultDirOnlyForInternalBlocks_(soydata.SanitizedJs);
soydata.VERY_UNSAFE.$$ordainSanitizedUriForInternalBlocks = soydata.$$makeSanitizedContentFactoryWithDefaultDirOnlyForInternalBlocks_(soydata.SanitizedUri);
soydata.VERY_UNSAFE.$$ordainSanitizedAttributesForInternalBlocks = soydata.$$makeSanitizedContentFactoryWithDefaultDirOnlyForInternalBlocks_(soydata.SanitizedHtmlAttribute);
soydata.VERY_UNSAFE.$$ordainSanitizedCssForInternalBlocks = soydata.$$makeSanitizedContentFactoryWithDefaultDirOnlyForInternalBlocks_(soydata.SanitizedCss);
soy.$$escapeHtml = function(a) {
    return soydata.SanitizedHtml.from(a)
};
soy.$$cleanHtml = function(a, b) {
    if (soydata.isContentKind(a, soydata.SanitizedContentKind.HTML)) return goog.asserts.assert(a.constructor === soydata.SanitizedHtml), a;
    var c;
    b ? (c = goog.object.createSet(b), goog.object.extend(c, soy.esc.$$SAFE_TAG_WHITELIST_)) : c = soy.esc.$$SAFE_TAG_WHITELIST_;
    return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$stripHtmlTags(a, c), soydata.getContentDir(a))
};
soy.$$normalizeHtml = function(a) {
    return soy.esc.$$normalizeHtmlHelper(a)
};
soy.$$escapeHtmlRcdata = function(a) {
    return soydata.isContentKind(a, soydata.SanitizedContentKind.HTML) ? (goog.asserts.assert(a.constructor === soydata.SanitizedHtml), soy.esc.$$normalizeHtmlHelper(a.getContent())) : soy.esc.$$escapeHtmlHelper(a)
};
soy.$$HTML5_VOID_ELEMENTS_ = /^<(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)\b/;
soy.$$stripHtmlTags = function(a, b) {
    if (!b) return String(a).replace(soy.esc.$$HTML_TAG_REGEX_, "").replace(soy.esc.$$LT_REGEX_, "&lt;");
    var c = String(a).replace(/\[/g, "&#91;"),
        d = [],
        e = [],
        c = c.replace(soy.esc.$$HTML_TAG_REGEX_, function(a, c) {
            if (c && (c = c.toLowerCase(), b.hasOwnProperty(c) && b[c])) {
                var f = "/" == a.charAt(1),
                    l = d.length,
                    n = "</",
                    m = "";
                if (!f) {
                    for (n = "<"; f = soy.esc.$$HTML_ATTRIBUTE_REGEX_.exec(a);)
                        if (f[1] && "dir" == f[1].toLowerCase()) {
                            if (f = f[2]) {
                                if ("'" == f.charAt(0) || '"' == f.charAt(0)) f = f.substr(1, f.length - 2);
                                f = f.toLowerCase();
                                if ("ltr" == f || "rtl" == f || "auto" == f) m = ' dir="' + f + '"'
                            }
                            break
                        }
                    soy.esc.$$HTML_ATTRIBUTE_REGEX_.lastIndex = 0
                }
                d[l] = n + c + ">";
                e[l] = m;
                return "[" + l + "]"
            }
            return ""
        }),
        c = soy.esc.$$normalizeHtmlHelper(c),
        f = soy.$$balanceTags_(d),
        c = c.replace(/\[(\d+)\]/g, function(a, b) {
            return e[b] && d[b] ? d[b].substr(0, d[b].length - 1) + e[b] + ">" : d[b]
        });
    return c + f
};
soy.$$balanceTags_ = function(a) {
    for (var b = [], c = 0, d = a.length; c < d; ++c) {
        var e = a[c];
        "/" == e.charAt(1) ? (e = goog.array.lastIndexOf(b, e), 0 > e ? a[c] = "" : (a[c] = b.slice(e).reverse().join(""), b.length = e)) : "<li>" == e && 0 > goog.array.lastIndexOf(b, "</ol>") && 0 > goog.array.lastIndexOf(b, "</ul>") ? a[c] = "" : soy.$$HTML5_VOID_ELEMENTS_.test(e) || b.push("</" + e.substring(1))
    }
    return b.reverse().join("")
};
soy.$$escapeHtmlAttribute = function(a) {
    return soydata.isContentKind(a, soydata.SanitizedContentKind.HTML) ? (goog.asserts.assert(a.constructor === soydata.SanitizedHtml), soy.esc.$$normalizeHtmlHelper(soy.$$stripHtmlTags(a.getContent()))) : soy.esc.$$escapeHtmlHelper(a)
};
soy.$$escapeHtmlAttributeNospace = function(a) {
    return soydata.isContentKind(a, soydata.SanitizedContentKind.HTML) ? (goog.asserts.assert(a.constructor === soydata.SanitizedHtml), soy.esc.$$normalizeHtmlNospaceHelper(soy.$$stripHtmlTags(a.getContent()))) : soy.esc.$$escapeHtmlNospaceHelper(a)
};
soy.$$filterHtmlAttributes = function(a) {
    return soydata.isContentKind(a, soydata.SanitizedContentKind.ATTRIBUTES) ? (goog.asserts.assert(a.constructor === soydata.SanitizedHtmlAttribute), a.getContent().replace(/([^"'\s])$/, "$1 ")) : soy.esc.$$filterHtmlAttributesHelper(a)
};
soy.$$filterHtmlElementName = function(a) {
    return soy.esc.$$filterHtmlElementNameHelper(a)
};
soy.$$escapeJs = function(a) {
    return soy.$$escapeJsString(a)
};
soy.$$escapeJsString = function(a) {
    return soy.esc.$$escapeJsStringHelper(a)
};
soy.$$escapeJsValue = function(a) {
    if (null == a) return " null ";
    if (soydata.isContentKind(a, soydata.SanitizedContentKind.JS)) return goog.asserts.assert(a.constructor === soydata.SanitizedJs), a.getContent();
    switch (typeof a) {
        case "boolean":
        case "number":
            return " " + a + " ";
        default:
            return "'" + soy.esc.$$escapeJsStringHelper(String(a)) + "'"
    }
};
soy.$$escapeJsRegex = function(a) {
    return soy.esc.$$escapeJsRegexHelper(a)
};
soy.$$problematicUriMarks_ = /['()]/g;
soy.$$pctEncode_ = function(a) {
    return "%" + a.charCodeAt(0).toString(16)
};
soy.$$escapeUri = function(a) {
    if (soydata.isContentKind(a, soydata.SanitizedContentKind.URI)) return goog.asserts.assert(a.constructor === soydata.SanitizedUri), soy.$$normalizeUri(a);
    if (a instanceof goog.html.SafeUrl) return soy.$$normalizeUri(goog.html.SafeUrl.unwrap(a));
    a = soy.esc.$$escapeUriHelper(a);
    soy.$$problematicUriMarks_.lastIndex = 0;
    return soy.$$problematicUriMarks_.test(a) ? a.replace(soy.$$problematicUriMarks_, soy.$$pctEncode_) : a
};
soy.$$normalizeUri = function(a) {
    return soy.esc.$$normalizeUriHelper(a)
};
soy.$$filterNormalizeUri = function(a) {
    return soydata.isContentKind(a, soydata.SanitizedContentKind.URI) ? (goog.asserts.assert(a.constructor === soydata.SanitizedUri), soy.$$normalizeUri(a)) : a instanceof goog.html.SafeUrl ? soy.$$normalizeUri(goog.html.SafeUrl.unwrap(a)) : soy.esc.$$filterNormalizeUriHelper(a)
};
soy.$$filterImageDataUri = function(a) {
    return soydata.VERY_UNSAFE.ordainSanitizedUri(soy.esc.$$filterImageDataUriHelper(a))
};
soy.$$escapeCssString = function(a) {
    return soy.esc.$$escapeCssStringHelper(a)
};
soy.$$filterCssValue = function(a) {
    return soydata.isContentKind(a, soydata.SanitizedContentKind.CSS) ? (goog.asserts.assert(a.constructor === soydata.SanitizedCss), a.getContent()) : null == a ? "" : a instanceof goog.html.SafeStyle ? goog.html.SafeStyle.unwrap(a) : soy.esc.$$filterCssValueHelper(a)
};
soy.$$filterNoAutoescape = function(a) {
    return soydata.isContentKind(a, soydata.SanitizedContentKind.TEXT) ? (goog.asserts.fail("Tainted SanitizedContentKind.TEXT for |noAutoescape: `%s`", [a.getContent()]), "zSoyz") : a
};
soy.$$changeNewlineToBr = function(a) {
    var b = goog.string.newLineToBr(String(a), !1);
    return soydata.isContentKind(a, soydata.SanitizedContentKind.HTML) ? soydata.VERY_UNSAFE.ordainSanitizedHtml(b, soydata.getContentDir(a)) : b
};
soy.$$insertWordBreaks = function(a, b) {
    var c = goog.format.insertWordBreaks(String(a), b);
    return soydata.isContentKind(a, soydata.SanitizedContentKind.HTML) ? soydata.VERY_UNSAFE.ordainSanitizedHtml(c, soydata.getContentDir(a)) : c
};
soy.$$truncate = function(a, b, c) {
    a = String(a);
    if (a.length <= b) return a;
    c && (3 < b ? b -= 3 : c = !1);
    soy.$$isHighSurrogate_(a.charAt(b - 1)) && soy.$$isLowSurrogate_(a.charAt(b)) && --b;
    a = a.substring(0, b);
    c && (a += "...");
    return a
};
soy.$$isHighSurrogate_ = function(a) {
    return 55296 <= a && 56319 >= a
};
soy.$$isLowSurrogate_ = function(a) {
    return 56320 <= a && 57343 >= a
};
soy.$$bidiFormatterCache_ = {};
soy.$$getBidiFormatterInstance_ = function(a) {
    return soy.$$bidiFormatterCache_[a] || (soy.$$bidiFormatterCache_[a] = new goog.i18n.BidiFormatter(a))
};
soy.$$bidiTextDir = function(a, b) {
    var c = soydata.getContentDir(a);
    if (null != c) return c;
    c = b || soydata.isContentKind(a, soydata.SanitizedContentKind.HTML);
    return goog.i18n.bidi.estimateDirection(a + "", c)
};
soy.$$bidiDirAttr = function(a, b, c) {
    a = soy.$$getBidiFormatterInstance_(a);
    var d = soydata.getContentDir(b);
    null == d && (c = c || soydata.isContentKind(b, soydata.SanitizedContentKind.HTML), d = goog.i18n.bidi.estimateDirection(b + "", c));
    return soydata.VERY_UNSAFE.ordainSanitizedHtmlAttribute(a.knownDirAttr(d))
};
soy.$$bidiMarkAfter = function(a, b, c) {
    a = soy.$$getBidiFormatterInstance_(a);
    c = c || soydata.isContentKind(b, soydata.SanitizedContentKind.HTML);
    return a.markAfterKnownDir(soydata.getContentDir(b), b + "", c)
};
soy.$$bidiSpanWrap = function(a, b) {
    var c = soy.$$getBidiFormatterInstance_(a),
        d = goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract(goog.string.Const.from("Soy |bidiSpanWrap is applied on an autoescaped text."), String(b)),
        c = c.spanWrapSafeHtmlWithKnownDir(soydata.getContentDir(b), d);
    return goog.html.SafeHtml.unwrap(c)
};
soy.$$bidiUnicodeWrap = function(a, b) {
    var c = soy.$$getBidiFormatterInstance_(a),
        d = soydata.isContentKind(b, soydata.SanitizedContentKind.HTML),
        e = c.unicodeWrapWithKnownDir(soydata.getContentDir(b), b + "", d),
        c = c.getContextDir();
    return soydata.isContentKind(b, soydata.SanitizedContentKind.TEXT) ? new soydata.UnsanitizedText(e, c) : d ? soydata.VERY_UNSAFE.ordainSanitizedHtml(e, c) : e
};
soy.esc.$$escapeHtmlHelper = function(a) {
    return goog.string.htmlEscape(String(a))
};
soy.esc.$$escapeUriHelper = function(a) {
    return goog.string.urlEncode(String(a))
};
soy.esc.$$ESCAPE_MAP_FOR_NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_ = {
    "\x00": "&#0;",
    "\t": "&#9;",
    "\n": "&#10;",
    "\x0B": "&#11;",
    "\f": "&#12;",
    "\r": "&#13;",
    " ": "&#32;",
    '"': "&quot;",
    "&": "&amp;",
    "'": "&#39;",
    "-": "&#45;",
    "/": "&#47;",
    "<": "&lt;",
    "=": "&#61;",
    ">": "&gt;",
    "`": "&#96;",
    "\u0085": "&#133;",
    "\u00a0": "&#160;",
    "\u2028": "&#8232;",
    "\u2029": "&#8233;"
};
soy.esc.$$REPLACER_FOR_NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_ = function(a) {
    return soy.esc.$$ESCAPE_MAP_FOR_NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_[a]
};
soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_ = {
    "\x00": "\\x00",
    "\b": "\\x08",
    "\t": "\\t",
    "\n": "\\n",
    "\x0B": "\\x0b",
    "\f": "\\f",
    "\r": "\\r",
    '"': "\\x22",
    $: "\\x24",
    "&": "\\x26",
    "'": "\\x27",
    "(": "\\x28",
    ")": "\\x29",
    "*": "\\x2a",
    "+": "\\x2b",
    ",": "\\x2c",
    "-": "\\x2d",
    ".": "\\x2e",
    "/": "\\/",
    ":": "\\x3a",
    "<": "\\x3c",
    "=": "\\x3d",
    ">": "\\x3e",
    "?": "\\x3f",
    "[": "\\x5b",
    "\\": "\\\\",
    "]": "\\x5d",
    "^": "\\x5e",
    "{": "\\x7b",
    "|": "\\x7c",
    "}": "\\x7d",
    "\u0085": "\\x85",
    "\u2028": "\\u2028",
    "\u2029": "\\u2029"
};
soy.esc.$$REPLACER_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_ = function(a) {
    return soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_[a]
};
soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_CSS_STRING_ = {
    "\x00": "\\0 ",
    "\b": "\\8 ",
    "\t": "\\9 ",
    "\n": "\\a ",
    "\x0B": "\\b ",
    "\f": "\\c ",
    "\r": "\\d ",
    '"': "\\22 ",
    "&": "\\26 ",
    "'": "\\27 ",
    "(": "\\28 ",
    ")": "\\29 ",
    "*": "\\2a ",
    "/": "\\2f ",
    ":": "\\3a ",
    ";": "\\3b ",
    "<": "\\3c ",
    "=": "\\3d ",
    ">": "\\3e ",
    "@": "\\40 ",
    "\\": "\\5c ",
    "{": "\\7b ",
    "}": "\\7d ",
    "\u0085": "\\85 ",
    "\u00a0": "\\a0 ",
    "\u2028": "\\2028 ",
    "\u2029": "\\2029 "
};
soy.esc.$$REPLACER_FOR_ESCAPE_CSS_STRING_ = function(a) {
    return soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_CSS_STRING_[a]
};
soy.esc.$$ESCAPE_MAP_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_ = {
    "\x00": "%00",
    "\u0001": "%01",
    "\u0002": "%02",
    "\u0003": "%03",
    "\u0004": "%04",
    "\u0005": "%05",
    "\u0006": "%06",
    "\u0007": "%07",
    "\b": "%08",
    "\t": "%09",
    "\n": "%0A",
    "\x0B": "%0B",
    "\f": "%0C",
    "\r": "%0D",
    "\u000e": "%0E",
    "\u000f": "%0F",
    "\u0010": "%10",
    "\u0011": "%11",
    "\u0012": "%12",
    "\u0013": "%13",
    "\u0014": "%14",
    "\u0015": "%15",
    "\u0016": "%16",
    "\u0017": "%17",
    "\u0018": "%18",
    "\u0019": "%19",
    "\u001a": "%1A",
    "\u001b": "%1B",
    "\u001c": "%1C",
    "\u001d": "%1D",
    "\u001e": "%1E",
    "\u001f": "%1F",
    " ": "%20",
    '"': "%22",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "<": "%3C",
    ">": "%3E",
    "\\": "%5C",
    "{": "%7B",
    "}": "%7D",
    "\u007f": "%7F",
    "\u0085": "%C2%85",
    "\u00a0": "%C2%A0",
    "\u2028": "%E2%80%A8",
    "\u2029": "%E2%80%A9",
    "\uff01": "%EF%BC%81",
    "\uff03": "%EF%BC%83",
    "\uff04": "%EF%BC%84",
    "\uff06": "%EF%BC%86",
    "\uff07": "%EF%BC%87",
    "\uff08": "%EF%BC%88",
    "\uff09": "%EF%BC%89",
    "\uff0a": "%EF%BC%8A",
    "\uff0b": "%EF%BC%8B",
    "\uff0c": "%EF%BC%8C",
    "\uff0f": "%EF%BC%8F",
    "\uff1a": "%EF%BC%9A",
    "\uff1b": "%EF%BC%9B",
    "\uff1d": "%EF%BC%9D",
    "\uff1f": "%EF%BC%9F",
    "\uff20": "%EF%BC%A0",
    "\uff3b": "%EF%BC%BB",
    "\uff3d": "%EF%BC%BD"
};
soy.esc.$$REPLACER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_ = function(a) {
    return soy.esc.$$ESCAPE_MAP_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_[a]
};
soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_ = /[\x00\x22\x27\x3c\x3e]/g;
soy.esc.$$MATCHER_FOR_ESCAPE_HTML_NOSPACE_ = /[\x00\x09-\x0d \x22\x26\x27\x2d\/\x3c-\x3e`\x85\xa0\u2028\u2029]/g;
soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_NOSPACE_ = /[\x00\x09-\x0d \x22\x27\x2d\/\x3c-\x3e`\x85\xa0\u2028\u2029]/g;
soy.esc.$$MATCHER_FOR_ESCAPE_JS_STRING_ = /[\x00\x08-\x0d\x22\x26\x27\/\x3c-\x3e\\\x85\u2028\u2029]/g;
soy.esc.$$MATCHER_FOR_ESCAPE_JS_REGEX_ = /[\x00\x08-\x0d\x22\x24\x26-\/\x3a\x3c-\x3f\x5b-\x5e\x7b-\x7d\x85\u2028\u2029]/g;
soy.esc.$$MATCHER_FOR_ESCAPE_CSS_STRING_ = /[\x00\x08-\x0d\x22\x26-\x2a\/\x3a-\x3e@\\\x7b\x7d\x85\xa0\u2028\u2029]/g;
soy.esc.$$MATCHER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_ = /[\x00- \x22\x27-\x29\x3c\x3e\\\x7b\x7d\x7f\x85\xa0\u2028\u2029\uff01\uff03\uff04\uff06-\uff0c\uff0f\uff1a\uff1b\uff1d\uff1f\uff20\uff3b\uff3d]/g;
soy.esc.$$FILTER_FOR_FILTER_CSS_VALUE_ = /^(?!-*(?:expression|(?:moz-)?binding))(?:[.#]?-?(?:[_a-z0-9-]+)(?:-[_a-z0-9-]+)*-?|-?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[a-z]{1,2}|%)?|!important|)$/i;
soy.esc.$$FILTER_FOR_FILTER_NORMALIZE_URI_ = /^(?![^#?]*\/(?:\.|%2E){2}(?:[\/?#]|$))(?:(?:https?|mailto):|[^&:\/?#]*(?:[\/?#]|$))/i;
soy.esc.$$FILTER_FOR_FILTER_IMAGE_DATA_URI_ = /^data:image\/(?:bmp|gif|jpe?g|png|tiff|webp);base64,[a-z0-9+\/]+=*$/i;
soy.esc.$$FILTER_FOR_FILTER_HTML_ATTRIBUTES_ = /^(?!style|on|action|archive|background|cite|classid|codebase|data|dsync|href|longdesc|src|usemap)(?:[a-z0-9_$:-]*)$/i;
soy.esc.$$FILTER_FOR_FILTER_HTML_ELEMENT_NAME_ = /^(?!script|style|title|textarea|xmp|no)[a-z0-9_$:-]*$/i;
soy.esc.$$normalizeHtmlHelper = function(a) {
    return String(a).replace(soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_, soy.esc.$$REPLACER_FOR_NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_)
};
soy.esc.$$escapeHtmlNospaceHelper = function(a) {
    return String(a).replace(soy.esc.$$MATCHER_FOR_ESCAPE_HTML_NOSPACE_, soy.esc.$$REPLACER_FOR_NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_)
};
soy.esc.$$normalizeHtmlNospaceHelper = function(a) {
    return String(a).replace(soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_NOSPACE_, soy.esc.$$REPLACER_FOR_NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_)
};
soy.esc.$$escapeJsStringHelper = function(a) {
    return String(a).replace(soy.esc.$$MATCHER_FOR_ESCAPE_JS_STRING_, soy.esc.$$REPLACER_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_)
};
soy.esc.$$escapeJsRegexHelper = function(a) {
    return String(a).replace(soy.esc.$$MATCHER_FOR_ESCAPE_JS_REGEX_, soy.esc.$$REPLACER_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_)
};
soy.esc.$$escapeCssStringHelper = function(a) {
    return String(a).replace(soy.esc.$$MATCHER_FOR_ESCAPE_CSS_STRING_, soy.esc.$$REPLACER_FOR_ESCAPE_CSS_STRING_)
};
soy.esc.$$filterCssValueHelper = function(a) {
    a = String(a);
    return soy.esc.$$FILTER_FOR_FILTER_CSS_VALUE_.test(a) ? a : (goog.asserts.fail("Bad value `%s` for |filterCssValue", [a]), "zSoyz")
};
soy.esc.$$normalizeUriHelper = function(a) {
    return String(a).replace(soy.esc.$$MATCHER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_, soy.esc.$$REPLACER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_)
};
soy.esc.$$filterNormalizeUriHelper = function(a) {
    a = String(a);
    return soy.esc.$$FILTER_FOR_FILTER_NORMALIZE_URI_.test(a) ? a.replace(soy.esc.$$MATCHER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_, soy.esc.$$REPLACER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_) : (goog.asserts.fail("Bad value `%s` for |filterNormalizeUri", [a]), "#zSoyz")
};
soy.esc.$$filterImageDataUriHelper = function(a) {
    a = String(a);
    return soy.esc.$$FILTER_FOR_FILTER_IMAGE_DATA_URI_.test(a) ? a : (goog.asserts.fail("Bad value `%s` for |filterImageDataUri", [a]), "data:image/gif;base64,zSoyz")
};
soy.esc.$$filterHtmlAttributesHelper = function(a) {
    a = String(a);
    return soy.esc.$$FILTER_FOR_FILTER_HTML_ATTRIBUTES_.test(a) ? a : (goog.asserts.fail("Bad value `%s` for |filterHtmlAttributes", [a]), "zSoyz")
};
soy.esc.$$filterHtmlElementNameHelper = function(a) {
    a = String(a);
    return soy.esc.$$FILTER_FOR_FILTER_HTML_ELEMENT_NAME_.test(a) ? a : (goog.asserts.fail("Bad value `%s` for |filterHtmlElementName", [a]), "zSoyz")
};
soy.esc.$$HTML_TAG_REGEX_ = /<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g;
soy.esc.$$LT_REGEX_ = /</g;
soy.esc.$$SAFE_TAG_WHITELIST_ = {
    b: !0,
    br: !0,
    em: !0,
    i: !0,
    s: !0,
    sub: !0,
    sup: !0,
    u: !0
};
soy.esc.$$HTML_ATTRIBUTE_REGEX_ = /([a-zA-Z][a-zA-Z0-9:\-]*)[\t\n\r\u0020]*=[\t\n\r\u0020]*("[^"]*"|'[^']*')/g;
var uniblog = {
    eventDefinition: {}
};
uniblog.eventDefinition.tap = function(a) {
    var b = function(a) {
            a.addEventListener("touchstart", c);
            a.addEventListener("mousedown", c)
        },
        c = function(a) {
            var b = a.target;
            b.eventPositionX = a.pageX;
            b.eventPositionY = a.pageY;
            b.touchStarted = !0;
            b.addEventListener("touchend", d);
            b.addEventListener("mouseup", d);
            b.addEventListener("touchcancel", d)
        },
        d = function(a) {
            var b = a.target;
            b.touchStarted = !1;
            a.pageX && a.pageY && b.eventPositionX === a.pageX && b.eventPositionY === a.pageY && (a = document.createEvent("Event"), a.initEvent("tap", !0, !1), b.dispatchEvent(a));
            b.removeEventListener("touchend", d);
            b.removeEventListener("mouseup", d);
            b.removeEventListener("touchcancel", d)
        };
    b(a);
    return {
        init: b,
        onTouchStart: c,
        onCancel: d
    }
};
uniblog.eventListener = function() {
    return {
        add: function(a, b) {
            if (uniblog.eventDefinition[a]) return new uniblog.eventDefinition[a](b)
        },
        on: function(a, b, c) {
            c || (c = document);
            c.addEventListener(a, function(a) {
                b(a.detail, a)
            })
        },
        emit: function(a, b, c) {
            a = new CustomEvent(a, {
                detail: b
            });
            c || (c = document);
            c.dispatchEvent(a)
        }
    }
}();
uniblog.common = {};
uniblog.common.component = function(a, b) {
    uniblog.components[a] = function(a) {
        this.handler = a;
        this.init()
    };
    uniblog.components[a].prototype = {
        init: function() {},
        update: function() {},
        on: function(a, b, e) {
            uniblog.eventListener.on(a, b, e)
        },
        emit: function(a, b, e) {
            uniblog.eventListener.emit(a, b, e)
        }
    };
    goog.object.extend(uniblog.components[a].prototype, b)
};
uniblog.common.extend = function(a, b, c) {
    var d = {};
    goog.object.extend(d, uniblog.components[a].prototype, c);
    uniblog.common.component(b, d)
};
uniblog.interaction = {};
uniblog.interaction.menu = function(a, b, c) {
    var d = [],
        e = [],
        f = {
            set: !1,
            fixed: !1
        },
        g = 0,
        h = 0,
        k = 0,
        l, n, m, p = function(a, b) {
            Array.prototype.forEach.call(a, function(a, c) {
                a.index = c + b
            });
            h = e.length;
            g = h - 1;
            f.set && u(f.fixed)
        },
        q = function(a) {
            document[a]("tap", B);
            l[a]("blur", v);
            l[a]("keydown", C);
            Array.prototype.forEach.call(e, function(b) {
                b[a]("focus", w);
                b[a]("blur", v);
                b[a]("keydown", D);
                "INPUT" !== b.tagName && (b[a]("mousedown", x), b[a]("mouseover", w))
            })
        },
        C = function(a) {
            switch (a.keyCode) {
                case 27:
                    f.fixed || r();
                    n.onStop(!0);
                    break;
                case 40:
                    t(k + 1, 1);
                    a.preventDefault();
                    a.stopPropagation();
                    break;
                case 38:
                    t(k + -1, -1), a.preventDefault(), a.stopPropagation()
            }
        },
        D = function(a) {
            switch (a.keyCode) {
                case 13:
                    x(a), a.preventDefault(), a.stopPropagation()
            }
        },
        w = function(a) {
            y(a.currentTarget.index)
        },
        E = function(a) {
            return m && 0 < m.length ? Array.prototype.some.call(m, function(b, c) {
                return b ? b.contains(a) : !1
            }) : !1
        },
        z = function(a) {
            l.contains(a) || E(a) || uniblog.utils.isTouchDevice && "BODY" === a.tagName || (f.fixed || r(), n.onStop(void 0))
        },
        v = function(a) {
            z(a.relatedTarget ||
                a.explicitOriginalTarget || document.activeElement)
        },
        B = function(a) {
            z(a.target)
        },
        t = function(a, b) {
            void 0 === b && (b = 1);
            var c = a;
            c > g ? c -= h : 0 > c && (c = g);
            "none" === getComputedStyle(e[c]).getPropertyValue("display").substr(0, 4) ? t(c + b, b) : y(c)
        },
        y = function(a) {
            k = a;
            e[a].focus();
            n.onFocus(e[k])
        },
        A = function(a) {
            k = a;
            n.onSelect(e[k]);
            e[k].href && window.location.assign(e[k].href)
        },
        x = function(a) {
            A(a.currentTarget.index)
        },
        u = function(a) {
            r();
            f.set = !0;
            f.fixed = a;
            q("addEventListener")
        },
        r = function() {
            f.set && (f.set = !1, q("removeEventListener"))
        };
    n = {
        status: f,
        getItems: function() {
            return e.slice()
        },
        appendItems: function(a) {
            e = d.slice();
            Array.prototype.forEach.call(a, function(a) {
                e.push(a)
            });
            p(a, d.length)
        },
        startInteraction: u,
        stopInteraction: r,
        selectItemByIndex: A,
        highlightItemByIndex: t,
        onFocus: function(a) {},
        onStop: function(a) {},
        onSelect: function(a) {}
    };
    (function(a, b, c) {
        l = a;
        m = c;
        e = d = b;
        p(b, 0);
        uniblog.eventListener.add("tap", l)
    })(a, b, c);
    return n
};
uniblog.components = {};
uniblog.components.menu = {};
uniblog.common.component("menu", {
    button: {},
    currentSelected: null,
    isOpen: !1,
    items: [],
    menu: {},
    leftClass: "uni-menu-left",
    openClass: "uni-menu-open",
    rightClass: "uni-menu-right",
    menuInteraction: null,
    init: function() {
        this.options = {
            customClass: null,
            relatedItems: null,
            onClose: null
        };
        goog.object.extend(this.options, uniblog.utils.getDataOptions(this.handler));
        this.setElements();
        this.setEvents();
        this.processItems();
        this.setInteraction()
    },
    setElements: function() {
        this.menu = this.handler.querySelector("ul", this.handler);
        this.button = this.handler.querySelector("button");
        this.items = this.handler.querySelectorAll("a");
        this.options.relatedItems && (this.relatedElements = document.querySelector(this.options.relatedItems))
    },
    setEvents: function() {
        this.button.addEventListener("keydown", this.onButtonKeyDown.bind(this));
        this.button.addEventListener("click", this.onButtonClick.bind(this));
        this.button.addEventListener("touchstart", this.onButtonClick.bind(this));
        this.menu.addEventListener("touchmove", this.onMenuSwipe.bind(this));
        this.on(uniblog.common.events.menu.close,
            this.closeMenu.bind(this));
        this.on(uniblog.common.events.searchBar.onSearch, this.closeMenu.bind(this));
        uniblog.utils.isMobile && window.addEventListener("orientationchange", this.onWindowResize.bind(this))
    },
    setInteraction: function() {
        this.menuInteraction = new uniblog.interaction.menu(this.handler, this.items, [this.relatedElements]);
        this.menuInteraction.onStop = this.stopInteraction.bind(this);
        this.menuInteraction.onSelect = this.selectItem.bind(this)
    },
    processItems: function() {
        Array.prototype.forEach.call(this.items,
            function(a) {
                var b = a.getAttribute("data");
                a.data = b ? b.toLowerCase() : ""
            })
    },
    onWindowResize: function() {
        "INPUT" !== document.activeElement.tagName && this.closeMenu()
    },
    onButtonKeyDown: function(a) {
        switch (a.keyCode) {
            case 13:
                this.toggleMenu();
                a.preventDefault();
                break;
            case 40:
                this.openMenu();
                this.setFocusOnFirstElement();
                a.preventDefault();
                break;
            case 38:
                this.openMenu(), this.setFocus(this.items.length - 1, -1), a.preventDefault()
        }
    },
    onButtonClick: function(a) {
        this.toggleMenu();
        a.preventDefault()
    },
    onMenuSwipe: function(a) {
        this.menu.contains(a.target) &&
            a.preventDefault()
    },
    setFocusOnFirstElement: function() {
        this.setFocus(0, 1)
    },
    setFocus: function(a, b) {
        this.menuInteraction.highlightItemByIndex(a, b)
    },
    selectItem: function() {
        this.closeMenu();
        this.button.focus()
    },
    stopInteraction: function(a) {
        this.closeMenu();
        a && this.button.focus()
    },
    closeMenu: function() {
        this.isOpen && (this.button.tabIndex = 0, this.isOpen = !1, this.currentSelected = null, goog.dom.classlist.removeAll(this.handler, [this.openClass, this.leftClass, this.rightClass]), this.menuInteraction.stopInteraction(),
            this.options.customClass && goog.dom.classlist.remove(document.body, this.options.customClass), this.options.onClose && this.emit(this.options.onClose))
    },
    openMenu: function() {
        this.emit(uniblog.common.events.menu.close);
        this.isOpen = !0;
        goog.dom.classlist.add(this.handler, this.openClass);
        this.button.tabIndex = -1;
        var a = this.menu.getBoundingClientRect(),
            b = a.left;
        a.left + a.width > window.innerWidth ? goog.dom.classlist.add(this.handler, this.rightClass) : 0 > b ? goog.dom.classlist.add(this.handler, this.leftClass) : goog.dom.classlist.remove(this.handler,
            this.rightClass);
        this.menuInteraction.startInteraction();
        this.options.customClass && goog.dom.classlist.add(document.body, this.options.customClass)
    },
    toggleMenu: function() {
        this.isOpen ? this.closeMenu() : (this.openMenu(), this.setFocusOnFirstElement())
    }
});
uniblog.components.dropdown = {};
uniblog.common.extend("menu", "dropdown", {
    defaultValue: "",
    selectedItemClass: "uni-dropdown-selected-item",
    setElements: function() {
        this.menu = this.handler.querySelector("ul", this.handler);
        this.button = this.handler.querySelector("button");
        this.items = this.handler.querySelectorAll("li");
        this.itemsLength = this.items.length;
        this.lastItem = this.itemsLength - 1;
        this.defaultValue = this.items[0].getAttribute("data-default");
        this.handler.setValue = this.setValue.bind(this)
    },
    setValue: function(a) {
        if (a) {
            a = a.toLowerCase();
            for (var b = !1, c = 0; c < this.itemsLength && !b; c++) this.items[c].data === a && (this.setSelectedItem(c), b = !0);
            b || this.setSelectedItem(1)
        } else this.setSelectedItem(1)
    },
    setSelectedItem: function(a) {
        var b = goog.dom.getElementByClass(this.selectedItemClass, this.handler);
        goog.dom.classlist.remove(b, this.selectedItemClass);
        goog.dom.classlist.add(this.items[a], this.selectedItemClass);
        this.setSelectedLabel(this.items[a].querySelector("span").innerText)
    },
    setSelectedLabel: function(a) {
        this.items[0].querySelector("span").innerText =
            a;
        this.button.innerText = a
    },
    selectItem: function(a) {
        this.button.focus();
        this.closeMenu();
        a = a.index;
        if (0 < a && (this.setSelectedItem(a), this.handler.onChange)) this.handler.onChange(this.items[a].data)
    }
});
uniblog.common.constants = {
    SEARCH_URL: "/search/?",
    SEARCH_API: "/api/v1/search/?"
};
uniblog.utils = function() {
    return {
        transform: function() {
            var a = !1,
                b = document.createElement("fake"),
                c = ["webkitTransform", "transform", "msTransform", "oTransform"],
                d;
            for (d = c.length; d--;)
                if (void 0 !== b.style[c[d]]) {
                    a = c[d];
                    break
                }
            return a
        },
        isTouchDevice: window.DocumentTouch && document instanceof DocumentTouch || "ontouchstart" in window,
        isMobile: /Android(.)+mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        isTablet: /android|ipad|playbook|silk/i.test(navigator.userAgent),
        isIE: function() {
            var a =
                window.navigator.userAgent,
                b = a.indexOf("MSIE ");
            if (0 < b) return parseInt(a.substring(b + 5, a.indexOf(".", b)), 10);
            if (0 < a.indexOf("Trident/")) return b = a.indexOf("rv:"), parseInt(a.substring(b + 3, a.indexOf(".", b)), 10);
            b = a.indexOf("Edge/");
            return 0 < b ? parseInt(a.substring(b + 5, a.indexOf(".", b)), 10) : !1
        },
        parseJSONObject: function(a) {
            var b;
            try {
                b = JSON.parse(a.replace(/'/g, '"')), goog.object.forEach(b, function(a, d) {
                    if ("string" === typeof a) try {
                        b[d] = decodeURIComponent(a)
                    } catch (e) {}
                })
            } catch (c) {
                b = {}
            }
            return b
        },
        getDataJson: function(a,
            b) {
            var c = a.getAttribute(b) || "{}";
            return this.parseJSONObject(c)
        },
        getDataOptions: function(a, b) {
            b || (b = "uni");
            return this.getDataJson(a, b + "-options")
        },
        timesince: function(a, b) {
            var c = a.replace(/[-:\s]/g, ",").split(",").map(function(a) {
                    return parseInt(a)
                }),
                d = b || new Date,
                e = d.getUTCFullYear(),
                d = d.getUTCMonth() + 1,
                f = c[1],
                g = c[0],
                c = new Date(Date.UTC(c[0], c[1] - 1, c[2], c[3], c[4], c[5])),
                h = Math.floor((Date.now() - c.getTime()) / 6E4),
                e = e - g,
                g = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
            if (1 < e) return "A While Ago";
            if (1 > h) return "now";
            if (60 > h) return h + " min ago";
            h = Math.floor(h / 60);
            if (24 > h) return h + (2 > h ? " hr ago" : " hrs ago");
            h = Math.floor(h / 24);
            if (7 > h) return h + (1 === h ? " day ago" : " days ago");
            if (12 === f && 1 === e && 12 > d || 0 === e) return g[c.getMonth()] + " " + c.getDate();
            if (1 === e) return "Last Year"
        },
        getParameterFromUrl: function(a, b) {
            var c = b;
            a = a.toLowerCase();
            c = c.replace(/[\[\]]/g, "\\$&").toLowerCase();
            return (c = (new RegExp("[?#&]" + c + "(=([^&]*)|&|$)")).exec(a)) && c[2] ? decodeURIComponent(c[2]).trim() : ""
        },
        format: function(a) {
            var b =
                Array.prototype.slice.call(arguments, 1, arguments.length);
            return a.replace(/{(\d+)}/g, function(a, d) {
                return "undefined" !== typeof b[d] ? b[d] : a
            })
        },
        formatUrl: function(a, b) {
            for (var c = Object.keys(b), d = c.length, e = a, f = [], g = 0; g < d; g++) b[c[g]].trim() && f.push(c[g] + "=" + encodeURIComponent(b[c[g]].trim()));
            "?" != e[e.length - 1] && (e += "?");
            return e += f.join("&")
        },
        search: function(endpoint, a, b, c) {
            var d;
            // c = c || uniblog.common.constants.SEARCH_URL;
            c = c || endpoint;
            if (a.q || b) b = window.location.pathname + window.location.search + window.location.hash, d = this.formatUrl(c,
                a), d !== b && (0 === b.indexOf(c) ? window.history.pushState({
                options: a
            }, "", d) : window.location.assign(d))
        },
        compare: function(a, b, c) {
            return a && b ? c ? JSON.stringify(a) === JSON.stringify(b) : JSON.stringify(a).toLowerCase() === JSON.stringify(b).toLowerCase() : !1
        },
        isCurrentUrl: function(a) {
            if (a) {
                var b = (window.location.protocol + "//" + window.location.host + window.location.pathname).replace(/\//g, " ").trim();
                return a.replace(/\//g, " ").trim() === b
            }
        },
        isExternalLink: function(a) {
            var b = String(a.href);
            return a.hostname && a.hostname !==
                location.hostname && 0 != b.toLowerCase().indexOf("mailto")
        },
        replaceQuotations: function(a) {
            return a.text.replace(/'/g, "\u2018").replace(/"/g, "\u201c")
        },
        toLowerCase: function(a) {
            return this.replaceQuotations(a).toLowerCase()
        },
        trim: function(a, b) {
            var c = new RegExp(b + "*$", "ig"),
                d = a.replace(new RegExp("^" + b + "*", "ig"), "");
            return d = d.replace(c, "")
        },
        getElementPosition: function(a, b) {
            for (var c = 0, d = 0, e = []; a && a !== b;) a.style.transform && (e = a.style.transform.split(")"), Array.prototype.forEach.call(e, function(a) {
                a = a.toLowerCase().split(" ").join("");
                0 === a.indexOf("translate3d") && (a = a.replace("translate3d(", "").split("px").join(""), a = a.split(","), c += parseInt(a[0]) || 0, d += parseInt(a[1]) || 0)
            })), c += a.offsetLeft || 0, d += a.offsetTop || 0, a = a.offsetParent;
            return {
                x: c,
                y: d
            }
        },
        getMousePosition: function(a, b) {
            var c = b.getBoundingClientRect(),
                d = document.documentElement;
            return {
                x: a.pageX - (c.left + (d.scrollLeft ? d.scrollLeft : document.body.scrollLeft)),
                y: a.pageY - (c.top + (d.scrollTop ? d.scrollTop : document.body.scrollTop))
            }
        }
    }
}();
uniblog.components.header = {};
uniblog.common.component("header", {
    scrollThrottle: null,
    scrolledClass: "uni-scrolled",
    init: function() {
        this.checkPosition();
        this.scrollThrottle = new goog.async.Throttle(this.checkPosition, 100, this);
        this.setEvents()
    },
    getScrollingPosition: function() {
        return window.pageYOffset
    },
    setEvents: function() {
        window.addEventListener("scroll", this.onScroll.bind(this));
        this.on(uniblog.common.events.header.onMenuClose, this.onCloseMenu.bind(this))
    },
    onCloseMenu: function() {
        this.emit(uniblog.common.events.searchBar.disable)
    },
    onScroll: function() {
        this.scrollThrottle.fire()
    },
    checkPosition: function() {
        uniblog.utils.isMobile && goog.dom.classlist.contains(document.body, "uni-header-menu-open") && "INPUT" !== document.activeElement.tagName ? this.emit(uniblog.common.events.menu.close) : document.body.scrollHeight > document.body.clientHeight + this.handler.clientHeight && 1 < this.getScrollingPosition() ? goog.dom.classlist.add(document.body, this.scrolledClass) : goog.dom.classlist.remove(document.body, this.scrolledClass)
    }
});
uniblog.components.parallax = {};
uniblog.common.component("parallax", {
    ticking: !1,
    range: 200,
    height: 0,
    transform: "",
    init: function() {
        if (!uniblog.utils.isMobile) {
            var a = this.handler.getBoundingClientRect().top,
                b = a,
                c = 0,
                d = 0;
            this.height = window.innerHeight;
            this.transform = uniblog.utils.transform();
            window.addEventListener("scroll", this.onScroll.bind(this), !1);
            for (window.addEventListener("resize", this.onResize.bind(this), !1); 1 < Math.abs(b - c);) c = b, d = Math.min(1, -b / this.height) * this.range, b = a + d;
            this.updatePosition(d)
        }
    },
    onResize: function() {
        this.height =
            window.innerHeight;
        this.update()
    },
    onScroll: function(a) {
        this.ticking || (this.ticking = !0, window.requestAnimationFrame(this.update.bind(this)))
    },
    update: function() {
        this.calculate();
        this.ticking = !1
    },
    calculate: function() {
        var a = this.handler.getBoundingClientRect().top;
        this.height < a - this.range || (a = Math.min(1, -a / this.height) * this.range, this.updatePosition(a))
    },
    updatePosition: function(a) {
        this.handler.style[this.transform] = "translate3d(0, " + a + "px, 0)"
    }
});
uniblog.components.hyperlink = {};
uniblog.common.component("hyperlink", {
    init: function() {
        this.setHighlighted()
    },
    setHighlighted: function() {
        uniblog.utils.isCurrentUrl(this.handler.href) && goog.dom.classlist.add(this.handler, "uni-hyperlink-selected")
    }
});
uniblog.components.timesince = {};
uniblog.common.component("timesince", {
    init: function() {
        var a = document.body.querySelectorAll(".uni-timesince");
        Array.prototype.forEach.call(a, function(a) {
            a.innerText = uniblog.utils.timesince(a.getAttribute("datetime"), null)
        })
    }
});
uniblog.common.events = {
    header: {
        onMenuClose: "uniblog.event.header.onMenuClose"
    },
    loadMore: {
        onLoad: "uniblog.event.loadMore.onLoad",
        onDataIsReady: "uniblog.event.loadMore.onDataIsReady",
        onReset: "uniblog.event.loadMore.onReset"
    },
    searchBar: {
        onSearch: "uniblog.event.searchBar.onSearch",
        onSearchChange: "uniblog.event.searchBar.onSearchChange",
        disable: "uniblog.event.searchBar.disable"
    },
    searchForm: {
        onSearch: "uniblog.event.searchForm.onSearch",
        onSearchChange: "uniblog.event.searchForm.onSearchChange"
    },
    menu: {
        close: "uniblog.event.menu.close"
    },
    videoHero: {
        onStart: "uniblog.event.videoHero.onStart"
    }
};
uniblog.components.loadMore = {};
uniblog.common.component("loadMore", {
    url: "paginate_by={0}&offset={1}&page={2}",
    first_page: !0,
    init: function() {
        this.options = uniblog.utils.getDataOptions(this.handler);
        this.next_page = this.options.next_page ? this.options.next_page : 1;
        (this.next_button = this.handler.querySelector(".uni-load-more-button")) && this.next_button.addEventListener("click", this.loadNext.bind(this));
        this.options.load_first_page && this.loadNext();
        this.setEvents()
    },
    setEvents: function() {
        this.on(uniblog.common.events.loadMore.onLoad, this.load.bind(this));
        this.on(uniblog.common.events.loadMore.onReset, this.reset.bind(this))
    },
    buildFirstPageUrl: function() {
        var a = this.options.endpoint,
            b = this.next_page;
        return this.options.paginate_first_by && 1 == b ? (a && (0 > a.indexOf("?") && (a += "?"), a += uniblog.utils.format(this.url, this.options.paginate_first_by, this.options.offset, b)), a) : this.buildUrl()
    },
    buildUrl: function() {
        var a = this.options.endpoint,
            b = this.options.offset,
            c = this.options.paginate_by,
            d = this.next_page;
        this.options.paginate_first_by && (b = this.options.paginate_first_by);
        this.options.paginate_first_by && this.first_page && (d = this.next_page - 1, this.first_page = !1);
        a && (0 > a.indexOf("?") && (a += "?"), a += uniblog.utils.format(this.url, c, b, d));
        return a
    },
    onLoadMore: function(a) {
        a = a.target.getResponseJson();
        var b = this.handler.querySelector(this.options.querySelector || "nav"),
            c = b.querySelector("a[href]:last-child"),
            d = Array.prototype.indexOf.call(b.children, c);
        goog.dom.classlist.remove(this.handler, "loading");
        a.has_next ? (goog.dom.classlist.add(this.handler, "active"), this.next_page = a.next_page) :
            goog.dom.classlist.remove(this.handler, "active");
        a.object_list && (a.object_list = a.object_list.filter(function(a) {
            return void 0 !== a.primary_tag_obj || a.asset_type
        }), a.object_list.reduce(function(a, c) {
            var d = document.createElement("div");
            c.published_at && (c.published_since = uniblog.utils.timesince(c.published_at));
            d.innerHTML = this.options && this.options.template ? uniblog.templates[this.options.template](c) : uniblog.templates.articleItem(c);
            b.appendChild(d.firstChild)
        }.bind(this), ""), uniblog.components.init(b));
        this.resizeWindow();
        this.emit(uniblog.common.events.loadMore.onDataIsReady, a);
        c && 0 < d && this.handler.querySelector("a[href]:nth-child(" + (d + 1) + ")").focus()
    },
    resizeWindow: function() {
        var a = window.document.createEvent("UIEvents");
        a.initUIEvent("resize", !0, !1, window, 0);
        window.dispatchEvent(a)
    },
    loadNext: function() {
        var a;
        if (a = this.first_page ? this.buildFirstPageUrl() : this.buildUrl()) goog.dom.classlist.add(this.handler, "loading"), goog.net.XhrIo.send(a, this.onLoadMore.bind(this))
    },
    load: function(a) {
        this.reset();
        a && goog.object.extend(this.options, a);
        this.next_page = this.options.next_page ? this.options.next_page : 1;
        this.loadNext()
    },
    reset: function() {
        this.handler.querySelector("nav").innerText = "";
        goog.dom.classlist.remove(this.handler, "active")
    }
});
uniblog.components.searchForm = {};
uniblog.common.component("searchForm", {
    clearButton: {},
    searchButton: {},
    searchObject: {},
    filters: {
        product: {
            filter: "product_tag",
            dropdown: {}
        },
        topic: {
            filter: "topic_tag",
            dropdown: {}
        },
        date: {
            filter: "date",
            dropdown: {}
        }
    },
    init: function() {
        this.options = uniblog.utils.getDataOptions(this.handler);
        this.filters = this.options.filters ? this.options.filters : this.filters;
        this.setElements();
        this.setEvents()
    },
    setElements: function() {
        this.searchBox = this.handler.querySelector(".uni-search-box input");
        for (name in this.filters) this.filters[name].dropdown =
            this.handler.querySelector('[name="uni-search-filters-' + name + '"]')
    },
    setEvents: function() {
        for (name in this.filters) this.filters[name].dropdown && (this.filters[name].dropdown.onChange = this.onFilterChange.bind(this, name));
        this.on(uniblog.common.events.searchForm.onSearchChange, this.onSearchChange.bind(this))
    },
    onSearchChange: function(a) {
        this.searchObject = a;
        for (name in this.filters) this.filters[name].dropdown && this.filters[name].dropdown.setValue(a[this.filters[name].filter])
    },
    onFilterChange: function(a,
        b) {
        this.searchObject[this.filters[a].filter] = b;
        this.search()
    },
    onSearchBoxKeyPress: function(a) {
        13 === a.keyCode && (this.search(), a.preventDefault())
    },
    search: function() {
        // uniblog.utils.search(this.searchObject, this.options.allowEmptySearch, this.options.searchPage);
        uniblog.utils.search(this.options.searchUrl, this.searchObject, this.options.allowEmptySearch, this.options.searchPage);
        this.emit(uniblog.common.events.searchForm.onSearch, this.searchObject)
    }
});
uniblog.components.socialFeeds = {};
uniblog.common.component("socialFeeds", {
    options: {},
    feedsElement: {},
    loadingClass: "uni-social-feeds-loading",
    init: function() {
        this.options = {};
        goog.object.extend(this.options, uniblog.utils.getDataOptions(this.handler));
        this.setElements();
        this.getFeeds()
    },
    setElements: function() {
        this.feedsElement = this.handler.querySelector(".uni-social-feeds-content")
    },
    getFeeds: function() {
        if (this.options.url) {
            var a = this.options.url + encodeURIComponent(this.options.userId);
            goog.dom.classlist.add(this.handler, this.loadingClass);
            goog.net.XhrIo.send(a, this.onGetFeeds.bind(this))
        }
    },
    onGetFeeds: function(a) {
        a = a.target.getResponseJson();
        if (this.options.template && uniblog.templates[this.options.template]) {
            Array.prototype.forEach.call(a.object_list, function(a) {
                a.created_since = uniblog.utils.timesince(a.created_at)
            });
            var b = uniblog.templates[this.options.template]({
                items: a.object_list
            });
            this.feedsElement.innerHTML = b
        }
        goog.dom.classlist.remove(this.handler, this.loadingClass);
        this.postRender(a)
    },
    postRender: function(a) {}
});
uniblog.components.tombstone = {};
uniblog.common.component("tombstone", {
    init: function() {
        var a = this.handler.querySelectorAll(".rich-text"),
            a = Array.prototype.filter.call(a, function(a) {
                return "figcaption" !== a.parentNode.tagName.toLowerCase()
            });
        if (a.length && (a = this.searchForLastText(a))) {
            var b = goog.dom.createDom("i", {
                "class": "tombstone"
            });
            goog.dom.insertSiblingAfter(b, a)
        }
    },
    searchForLastText: function(a) {
        for (var b, c = a.length - 1; 0 <= c; c--)
            if (b = a[c].textContent.trim(), b.length) {
                b = a[c].childNodes;
                if (b.length) return this.searchForLastText(b);
                if (a[c].nodeType ===
                    Node.TEXT_NODE) return a[c]
            }
    }
});
uniblog.components.video = {};
uniblog.common.component("video", {
    player: {},
    overlay: {},
    playButton: {},
    keyFrame: {},
    videoId: null,
    index: "",
    options: {},
    init: function() {
        this.options = {};
        goog.object.extend(this.options, uniblog.utils.getDataOptions(this.handler));
        this.setElements();
        this.startYoutubeAPI();
        this.setEvents()
    },
    setElements: function() {
        this.overlay = goog.dom.getElementByClass("uni-video-overlay", this.handler);
        this.playButton = goog.dom.getElementByClass("uni-video-play-button", this.handler);
        this.keyFrame = goog.dom.getElementByClass("uni-video-key-frame",
            this.handler);
        this.videoId = this.handler.getAttribute("uni-video-id");
        this.index = this.handler.getAttribute("uni-block-index")
    },
    playVideo: function() {
        if (this.player.playVideo) {
            goog.dom.classlist.add(this.handler, "uni-video-ready");
            goog.dom.classlist.add(this.handler, "uni-video-play-start");
            this.player.playVideo();
            var a = this.handler.querySelector("iframe");
            a && a.focus()
        }
    },
    setEvents: function() {
        this.options.overlay && (this.overlay.addEventListener("click", this.playVideo.bind(this)), this.playButton.addEventListener("click",
            this.playVideo.bind(this)))
    },
    startYoutubeAPI: function() {
        if (!document.getElementById("uni-script-youtube")) {
            window.uniPlayers = [];
            window.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady;
            var a = document.createElement("script");
            a.id = "uni-script-youtube";
            a.src = "https://www.youtube.com/iframe_api";
            document.body.appendChild(a)
        }
        window.uniPlayers.push(this)
    },
    onYouTubeIframeAPIReady: function() {
        window.uniPlayers.forEach(function(a) {
            a.onReady.bind(a)()
        })
    },
    onReady: function() {
        this.player = new YT.Player("uni-video-" +
            this.videoId + "-" + this.index, {
                height: "100%",
                width: "100%",
                videoId: this.videoId,
                playerVars: {
                    showinfo: 0
                },
                events: {
                    onStateChange: this.onPlayerStateChange.bind(this)
                }
            })
    },
    onPlayerStateChange: function(a) {
        a.data === YT.PlayerState.PLAYING ? (goog.dom.classlist.add(this.handler, "uni-video-playing"), this.options.onStart && this.emit(this.options.onStart)) : a.data === YT.PlayerState.BUFFERING && goog.dom.classlist.add(this.handler, "uni-video-play-start")
    }
});
uniblog.components.searchBar = {};
uniblog.common.component("searchBar", {
    openButton: {},
    closeButton: {},
    isSearchEnabled: !1,
    searchButton: {},
    searchBox: {},
    searchBoxContainer: {},
    searchObject: {},
    searchVisibleClass: "uni-is-search-visible",
    menuInteraction: null,
    typeAhead: {
        call: null,
        container: {},
        currentSelectedItem: null,
        debounce: null,
        items: {},
        query: ""
    },
    init: function() {
        this.options = uniblog.utils.getDataOptions(this.handler);
        this.setElements();
        this.setEvents();
        this.typeAhead.debounce = new goog.async.Debouncer(this.getTypeAhead, 250, this);
        this.setInteraction()
    },
    setInteraction: function() {
        this.menuInteraction = new uniblog.interaction.menu(this.handler, [this.searchBox]);
        this.menuInteraction.startInteraction(!0);
        this.menuInteraction.onStop = this.onCloseButtonClick.bind(this);
        this.menuInteraction.onSelect = this.onCloseButtonClick.bind(this)
    },
    setElements: function() {
        this.openButton = this.options.open ? document.querySelector(this.options.open) : goog.dom.getElementByClass("uni-header-search-button", this.handler);
        this.closeButton = goog.dom.getElementByClass("uni-search-box-close-button",
            this.handler);
        this.searchButton = goog.dom.getElementByClass("uni-search-box-search-button", this.handler);
        this.searchBox = this.handler.querySelector(".uni-search-box input");
        this.searchBoxContainer = this.handler.querySelector(".uni-search-box");
        this.typeAhead.container = this.handler.querySelector(".uni-type-ahead")
    },
    setEvents: function() {
        this.openButton.addEventListener("click", this.onOpenButtonClick.bind(this));
        this.closeButton.addEventListener("click", this.onCloseButtonClick.bind(this));
        this.closeButton.addEventListener("blur",
            this.onCloseButtonBlur.bind(this));
        this.searchButton.addEventListener("click", this.onSearchButtonClick.bind(this));
        this.searchBox.addEventListener("keydown", this.onSearchBoxKeyPress.bind(this));
        this.searchBox.addEventListener("input", this.onSearchBoxInputChange.bind(this));
        this.searchBox.addEventListener("focus", this.onSearchBoxInputFocus.bind(this));
        this.on(uniblog.common.events.searchBar.disable, this.disableSearch.bind(this))
    },
    onSearchBoxInputFocus: function() {
        goog.dom.classlist.add(document.body,
            "uni-search-box-active")
    },
    clearTypeAhead: function() {
        this.typeAhead.container.innerText = "";
        this.typeAhead.query = ""
    },
    enableSearch: function() {
        this.isSearchEnabled = !0;
        goog.dom.classlist.add(document.body, this.searchVisibleClass);
        setTimeout(this.setFocus.bind(this), 100);
        this.openButton.tabIndex = -1
    },
    disableSearch: function() {
        this.clearTypeAhead();
        this.typeAhead.currentSelectedItem = null;
        this.isSearchEnabled = !1;
        this.searchBox.blur();
        goog.dom.classlist.remove(document.body, this.searchVisibleClass);
        this.openButton.tabIndex =
            0;
        goog.dom.classlist.remove(document.body, "uni-search-box-active");
        this.searchBox.value = ""
    },
    onCloseButtonBlur: function(a) {
        this.searchBoxContainer.contains(a.relatedTarget || a.explicitOriginalTarget || document.activeElement) || this.disableSearch()
    },
    onCloseButtonClick: function(a) {
        this.disableSearch();
        if (a) {
            var b = this;
            setTimeout(function() {
                b.openButton.focus()
            }, 100);
            a.preventDefault && a.preventDefault();
            !0 === a && this.emit(uniblog.common.events.menu.close)
        }
    },
    onSearchButtonClick: function(a) {
        this.search();
        a.preventDefault()
    },
    onOpenButtonClick: function(a) {
        this.searchBox.value = "";
        this.enableSearch();
        a.preventDefault()
    },
    onSearchBoxInputChange: function(a) {
        "" === this.searchBox.value.trim() ? this.clearTypeAhead() : this.typeAhead.debounce.fire()
    },
    onSearchBoxKeyPress: function(a) {
        13 === a.keyCode && (a.preventDefault(), this.search())
    },
    getTypeAhead: function(a) {
        (a = this.searchBox.value.trim()) && 0 < a.length && this.typeAhead.query !== a && (this.typeAhead.call && this.typeAhead.call.isActive() && this.typeAhead.call.abort(), this.typeAhead.query = a,
            // this.typeAhead.call = goog.net.XhrIo.send("/api/v1/type-ahead/?q=" + a, this.onGetTypeAhead.bind(this)))
            this.typeAhead.call = goog.net.XhrIo.send(this.options.endpoint + "?q=" + a, this.onGetTypeAhead.bind(this)))
    },
    setFocus: function() {
        this.searchBox.focus()
    },
    search: function() {
        goog.net.XhrIo.cleanup();
        this.searchObject.q = this.searchBox.value.trim();
        this.searchBox.blur();
        this.disableSearch();
        "" !== this.searchObject.q && (uniblog.utils.search(this.options.searchUrl, this.searchObject), this.emit(uniblog.common.events.searchBar.onSearch, this.searchObject))
    },
    onGetTypeAhead: function(a) {
        this.typeAhead.currentSelectedItem = null;
        a = a.target.getResponseJson();
        a = uniblog.templates.typeAheadList({
            items: a.object_list
        });
        this.typeAhead.container.innerHTML = a;
        this.menuInteraction.appendItems(this.typeAhead.container.querySelectorAll("a"))
    }
});
uniblog.components.touchScroll = {};
uniblog.common.component("touchScroll", {
    lastY: 0,
    events: {},
    init: function() {
        uniblog.utils.isTouchDevice && (this.events.drag = this.drag.bind(this), this.events.dragEnd = this.dragEnd.bind(this), this.events.dragStart = this.dragStart.bind(this), this.handler.addEventListener("touchstart", this.events.dragStart))
    },
    dragStart: function(a) {
        this.handler.scrollHeight > this.handler.getBoundingClientRect().height && (this.lastY = a.changedTouches[0].clientY, this.handler.addEventListener("touchmove", this.events.drag), this.handler.addEventListener("touchend",
            this.events.dragEnd), this.handler.addEventListener("touchcancel", this.events.dragEnd))
    },
    drag: function(a) {
        var b = this.handler.getBoundingClientRect(),
            c = a.changedTouches[0].clientY;
        5 < Math.abs(c - this.lastY) && (a.target.focus(), c < this.lastY ? Math.ceil(this.handler.scrollTop + b.height) >= this.handler.scrollHeight && a.preventDefault() : 0 >= Math.floor(this.handler.scrollTop) && a.preventDefault(), this.lastY = c)
    },
    dragEnd: function(a) {
        this.handler.removeEventListener("touchmove", this.events.drag);
        this.handler.removeEventListener("touchend",
            this.events.dragEnd);
        this.handler.removeEventListener("touchcancel", this.events.dragEnd)
    }
});
uniblog.components.skipMenu = {};
uniblog.common.component("skipMenu", {
    main: {},
    focusableElements: 'a[href] area[href] button input iframe select textarea [contentEditable] [contentEditable="true"] [tabindex]'.split(" "),
    excludedElements: ['[tabindex^="-"]', "[disabled]"],
    selector: "",
    isVisibleClass: "uni-is-skip-menu-visible",
    init: function() {
        this.setElements();
        this.setEvents();
        this.buildSelector()
    },
    setElements: function() {
        this.main = document.querySelector("main")
    },
    setEvents: function() {
        this.handler.addEventListener("keydown", this.onKeyDown.bind(this));
        this.handler.addEventListener("focus", this.onFocus.bind(this));
        this.handler.addEventListener("blur", this.onBlur.bind(this))
    },
    onFocus: function() {
        goog.dom.classlist.add(document.body, this.isVisibleClass)
    },
    onBlur: function() {
        goog.dom.classlist.remove(document.body, this.isVisibleClass)
    },
    onKeyDown: function(a) {
        switch (a.keyCode) {
            case 13:
                var b = this.main.querySelector(this.selector);
                b && b.focus();
                a.preventDefault()
        }
    },
    buildSelector: function() {
        var a = this.excludedElements.reduce(function(a, c) {
            return a + ":not(" +
                c + ")"
        }, "");
        this.selector = this.focusableElements.map(function(b) {
            return b + a
        }).join(",")
    }
});
uniblog.components.modal = {};
uniblog.common.component("modal", {
    content: {},
    closeButton: {},
    openClass: "uni-modal-is-open",
    options: {},
    container: {},
    overlay: {},
    wrapper: {},
    onWindowKeyDownHandler: {},
    onOverlayTouchMoveHandler: {},
    onCloseButtonClickHandler: {},
    onDocumentClickHandler: {},
    init: function() {
        this.options = uniblog.utils.getDataOptions(this.handler);
        this.setElements();
        this.setEvents()
    },
    setElements: function() {
        this.container = document.querySelector(".uni-modal");
        this.content = this.container.querySelector(".uni-modal-content");
        this.wrapper =
            this.container.querySelector(".uni-modal-wrapper");
        this.closeButton = this.container.querySelector(".uni-modal-close-button");
        this.overlay = this.container.querySelector(".uni-modal-overlay")
    },
    setEvents: function() {
        this.handler.addEventListener("click", this.onHandlerClick.bind(this));
        this.handler.addEventListener("keydown", this.OnHandlerKeyDown.bind(this))
    },
    onCloseButtonClick: function(a) {
        this.close();
        a.preventDefault();
        a.stopPropagation()
    },
    onHandlerClick: function(a) {
        a.target.getAttribute("href") || (this.open(),
            a.stopPropagation())
    },
    onDocumentClick: function(a) {
        this.content.contains(a.target) || this.close()
    },
    onOverlayTouchMove: function(a) {
        a.preventDefault();
        a.stopPropagation()
    },
    OnWindowKeyDown: function(a) {
        27 === a.keyCode && this.close()
    },
    OnHandlerKeyDown: function(a) {
        this.handler === a.target && 13 === a.keyCode && (this.open(), a.preventDefault())
    },
    close: function() {
        goog.dom.classlist.remove(document.body, this.openClass);
        this.overlay.removeEventListener("touchmove", this.onOverlayTouchMoveHandler);
        this.closeButton.removeEventListener("click",
            this.onCloseButtonClickHandler);
        this.closeButton.removeEventListener("touchstart", this.onCloseButtonClickHandler);
        document.removeEventListener("click", this.onDocumentClickHandler);
        document.removeEventListener("tap", this.onDocumentClickHandler);
        window.removeEventListener("keydown", this.onWindowKeyDownHandler);
        this.container.contains(document.activeElement) && this.handler.focus()
    },
    open: function() {
        this.content.innerHTML = uniblog.templates[this.options.template](this.options.data);
        uniblog.components.init(this.content);
        this.wrapper.scrollTop = 0;
        goog.dom.classlist.add(document.body, this.openClass);
        this.closeButton.focus();
        this.onOverlayTouchMoveHandler = this.onOverlayTouchMove.bind(this);
        this.onCloseButtonClickHandler = this.onCloseButtonClick.bind(this);
        this.onDocumentClickHandler = this.onDocumentClick.bind(this);
        this.onWindowKeyDownHandler = this.OnWindowKeyDown.bind(this);
        this.overlay.addEventListener("touchmove", this.onOverlayTouchMoveHandler);
        this.closeButton.addEventListener("click", this.onCloseButtonClickHandler);
        this.closeButton.addEventListener("touchstart", this.onCloseButtonClickHandler);
        document.addEventListener("click", this.onDocumentClickHandler);
        document.addEventListener("tap", this.onDocumentClickHandler);
        window.addEventListener("keydown", this.onWindowKeyDownHandler)
    }
});
uniblog.components.videoHero = {};
uniblog.common.component("videoHero", {
    startClass: "uni-blog-article-start-video",
    init: function() {
        this.on(uniblog.common.events.videoHero.onStart, this.onVideoStart.bind(this))
    },
    onVideoStart: function() {
        goog.dom.classlist.add(this.handler, this.startClass)
    }
});
uniblog.components.googleSocialFeeds = {};
uniblog.common.extend("socialFeeds", "googleSocialFeeds", {
    postRender: function() {
        var a = this.handler.querySelectorAll(".uni-social-google-like-button"),
            b;
        Array.prototype.forEach.call(a, function(a) {
            b = uniblog.utils.getDataOptions(a);
            window.gapi && window.gapi.plusone && window.gapi.plusone.render(a, b)
        })
    }
});
uniblog.components.fab = {};
uniblog.common.component("fab", {
    init: function() {
        this.setEvents()
    },
    setEvents: function() {
        var a = this,
            b = this.handler.querySelector(".uni-fab-toggle", this.handler),
            c = this.handler.querySelectorAll("a");
        b.addEventListener("click", this.toggleFabMenu.bind(this));
        Array.prototype.forEach.call(c, function(b) {
            b.addEventListener("click", a.openSocialWindow.bind(a, b));
            b.addEventListener("keydown", a.onKeydown.bind(a, b))
        })
    },
    onKeydown: function(a, b) {
        switch (b.keyCode) {
            case 13:
                this.openSocialWindow(a);
                b.preventDefault();
                break;
            case 27:
                this.toggleFabMenu(b), b.preventDefault()
        }
    },
    openSocialWindow: function(a) {
        a = goog.dom.dataset.get(a, "link");
        window.open(a, "_blank", "width=680,height=460")
    },
    toggleFabMenu: function(a) {
        a.preventDefault();
        goog.dom.classes.toggle(this.handler, "uni-toggled")
    }
});
uniblog.components.analyticsEvents = {};
uniblog.components.analyticsEvents.scroll = function() {
    return {
        ranges: [{
            value: 25,
            viewed: !1
        }, {
            value: 50,
            viewed: !1
        }, {
            value: 75,
            viewed: !1
        }, {
            value: 100,
            viewed: !1
        }],
        update: function() {
            var a = this;
            window.addEventListener("scroll", function(b) {
                a.onScroll(b, this)
            });
            setTimeout(a.onScroll.bind(a), 500)
        },
        onScroll: function() {
            var a = this.calculatePercentViewed();
            this.push(a)
        },
        calculatePercentViewed: function() {
            return 25 * Math.floor(100 * ((document.body.scrollTop || document.documentElement.scrollTop) + document.body.clientHeight) /
                document.body.scrollHeight / 25)
        },
        push: function(a) {
            a && this.ranges.forEach(function(b) {
                if (b.value <= a && !b.viewed) {
                    var c = {
                        event: "page interaction",
                        category: "scroll tracking",
                        action: b.value + "% viewed"
                    };
                    b.viewed = !0;
                    window.dataLayer.push(c)
                }
            })
        }
    }
};
uniblog.components.analyticsEvents.click = function(a, b) {
    return {
        update: function() {
            var b = uniblog.utils.getDataOptions(a),
                d = a.nodeName.toLowerCase();
            "a" === d || "button" === d || b.clickable ? this.addTrackingEvent(a) : Array.prototype.forEach.call(a.querySelectorAll("a"), this.addTrackingEvent.bind(this))
        },
        addTrackingEvent: function(a) {
            goog.dom.classlist.contains(a, "uni-analytics-link") || (goog.dom.classlist.add(a, "uni-analytics-link"), this.addTrackingEventListener(a))
        },
        addTrackingEventListener: function(b) {
            var d =
                this;
            b.addEventListener("mousedown", function(a) {
                d.onClick(a, this);
                d.stopPropagation(a)
            });
            b.addEventListener("keydown", function(b) {
                if (b.target === a && 13 === b.keyCode) d.onClick(b, this)
            })
        },
        stopPropagation: function(b) {
            uniblog.utils.getDataOptions(a).stopPropagation && b.stopPropagation()
        },
        onClick: function(a, d) {
            var e, f = goog.object.clone(b),
                g = {
                    name: function() {
                        return d.text.trim()
                    },
                    slug: function() {
                        return uniblog.utils.trim(d.getAttribute("href"), "/")
                    }
                };
            goog.object.extend(f, uniblog.utils.getDataJson(d, "data-analytics"));
            if (f.label) {
                for (var h in g) 0 <= f.label.indexOf("{" + h + "}") && (e = new RegExp("{" + h + "}", "g"), f.label = f.label.replace(e, g[h]()));
                f.label = f.label.toLowerCase()
            } else f.label = "";
            window.dataLayer.push(f)
        }
    }
};
uniblog.components.analytics = {};
uniblog.common.component("analytics", {
    init: function() {
        var a = {
            trackingEvent: "click"
        };
        goog.object.extend(a, uniblog.utils.getDataOptions(this.handler));
        this.dataLayer = {
            event: "page interaction",
            category: "",
            action: ""
        };
        goog.object.extend(this.dataLayer, uniblog.utils.getDataJson(this.handler, "data-analytics"));
        if (uniblog.components.analyticsEvents[a.trackingEvent]) {
            var b = new uniblog.components.analyticsEvents[a.trackingEvent](this.handler, this.dataLayer);
            b.update();
            if (a.update) this.on(a.update, b.update.bind(b))
        }
    }
});
uniblog.components.searchController = {};
uniblog.common.component("searchController", {
    counterLabel: "",
    searchObject: {
        q: "",
        product_tag: "",
        topic_tag: "",
        date: "",
        asset_type: ""
    },
    inProgressClass: "uni-search-in-progress",
    init: function() {
        this.options = {
            allowEmptySearch: !1,
            endpoint: uniblog.common.constants.SEARCH_API,
            searchBar: uniblog.common.events.searchBar.onSearch
        };
        goog.object.extend(this.options, uniblog.utils.getDataOptions(this.handler));
        this.setElements();
        this.setEvents();
        this.onQueryChange();
        this.reset();
        "undefined" != typeof window.onbeforeunload &&
            (window.onbeforeunload = function() {})
    },
    setEvents: function() {
        window.onhashchange = this.onQueryChange.bind(this);
        window.onpopstate = this.onQueryChange.bind(this);
        this.on(uniblog.common.events.loadMore.onDataIsReady, this.onDataIsReady.bind(this));
        if (this.options.searchBar) this.on(uniblog.common.events.searchBar.onSearch, this.onSearch.bind(this));
        this.on(uniblog.common.events.searchForm.onSearch, this.onSearch.bind(this))
    },
    onQueryChange: function() {
        var a = {};
        if (window.location.search)
            for (name in this.searchObject) a[name] =
                uniblog.utils.getParameterFromUrl(window.location.search, name);
        this.search(a)
    },
    onDataIsReady: function(a) {
        this.render(a);
        goog.dom.classlist.add(this.handler, "uni-search-ready");
        goog.dom.classlist.remove(document.body, this.inProgressClass);
        this.track(a)
    },
    onSearch: function(a) {
        this.search(a)
    },
    search: function(a) {
        uniblog.utils.compare(this.searchObject, a) || (this.searchObject = goog.object.clone(a), this.searchObject.q || this.options.allowEmptySearch ? (a = {
            endpoint: uniblog.utils.formatUrl(this.options.endpoint,
                this.searchObject) + "&",
            q: this.searchObject.q
        }, goog.dom.classlist.add(document.body, this.inProgressClass), this.emit(uniblog.common.events.loadMore.onLoad, a)) : (this.reset(), this.emit(uniblog.common.events.loadMore.onReset)), this.emit(uniblog.common.events.searchForm.onSearchChange, goog.object.clone(this.searchObject)), this.emit(uniblog.common.events.searchBar.onSearchChange, goog.object.clone(this.searchObject)))
    },
    setElements: function() {},
    reset: function() {},
    render: function(a) {},
    track: function(a) {}
});
uniblog.components.pressSearchController = {};
uniblog.common.extend("searchController", "pressSearchController", {
    track: function(a) {
        if (1 == a.current) {
            var b = {
                event: "page interaction",
                category: "press",
                action: "search results loaded",
                label: ""
            };
            b.label += "product filter:" + (this.searchObject.product_tag || "all products") + "|";
            b.label += "topic filter:" + (this.searchObject.topic_tag || "all topics") + "|";
            b.label += "type filter:" + (this.searchObject.asset_type || "all types") + "|";
            b.label += "results:" + a.count;
            b.label = b.label.toLowerCase();
            window.dataLayer.push(b)
        }
    }
});
uniblog.components.carousel = {};
uniblog.common.component("carousel", {
    options: {
        activeClass: "uni-carousel-active",
        animateClass: "uni-carousel-animate",
        slideWrap: ".uni-carousel-container",
        slides: "figure",
        slideContent: ".uni-carousel-slide-content",
        dragClass: "uni-carousel-dragging",
        arrowsContainer: ".uni-carousel-arrows-container",
        infinite: !0,
        display: 1,
        disableDragging: !1,
        next: ".uni-carousel-right-arrow",
        prev: ".uni-carousel-left-arrow",
        bullets: "nav button"
    },
    current: 0,
    slides: [],
    sliding: !1,
    dragging: !1,
    dragThreshold: 50,
    deltaX: 0,
    init: function() {
        this.setElements();
        this.slideWrap && this.slides && (this.numSlides = this.slides.length, this.width = this.getWidth(), this.numSlides < this.options.display ? this.sliding = !0 : (this.options.infinite && this.cloneSlides(this.options.display), goog.dom.classlist.add(this.slides[0], this.options.activeClass), this.setEvents(), this.go(0)))
    },
    setElements: function() {
        this.slideWrap = this.handler.querySelector(this.options.slideWrap);
        this.bullets = this.handler.querySelectorAll(this.options.bullets);
        this.nextButton = this.handler.querySelector(this.options.next);
        this.previousButton = this.handler.querySelector(this.options.prev);
        this.arrowsContainer = this.handler.querySelector(this.options.arrowsContainer);
        this.slideWrap && (this.slides = this.slideWrap.querySelectorAll(this.options.slides))
    },
    setEvents: function() {
        this.options.disableDragging || (uniblog.utils.isTouchDevice ? (this.handler.addEventListener("touchstart", this.dragStart.bind(this)), this.handler.addEventListener("touchmove", this.drag.bind(this)), this.handler.addEventListener("touchend", this.dragEnd.bind(this)),
            this.handler.addEventListener("touchcancel", this.dragEnd.bind(this))) : (this.handler.addEventListener("mousedown", this.dragStart.bind(this)), this.handler.addEventListener("mousemove", this.drag.bind(this)), this.handler.addEventListener("mouseup", this.dragEnd.bind(this)), this.handler.addEventListener("mouseleave", this.dragEnd.bind(this))));
        this.arrowsContainer && this.arrowsContainer.addEventListener("click", this.next.bind(this));
        this.previousButton && this.previousButton.addEventListener("click", this.prev.bind(this));
        this.nextButton && this.nextButton.addEventListener("click", this.next.bind(this));
        this.bullets && this.bullets.length && Array.prototype.forEach.call(this.bullets, function(a, b) {
            a.index = b;
            a.addEventListener("click", this.onBulletClick.bind(this))
        }.bind(this));
        window.addEventListener("resize", this.updateView.bind(this));
        window.addEventListener("orientationchange", this.updateView.bind(this))
    },
    onBulletClick: function(a) {
        a.preventDefault();
        this.go(a.target.index)
    },
    next: function() {
        this.options.infinite || this.current !==
            this.numSlides - 1 ? this.go(this.current + 1) : this.go(this.numSlides - 1)
    },
    prev: function() {
        this.options.infinite || 0 !== this.current ? this.go(this.current - 1) : this.go(0)
    },
    go: function(a) {
        if (!this.sliding) {
            this.width = this.getWidth();
            if (0 > a || a >= this.numSlides) this.slide(-((0 > a ? this.current + this.numSlides : this.current - this.numSlides) * this.width - this.deltaX) + "px"), this.slideWrap.offsetHeight;
            a = this.loop(a);
            if (this.options.onSlide) this.options.onSlide(a, this.current);
            this.slide(-(a * this.width) + "px", !0);
            goog.dom.classlist.remove(this.slides[this.current],
                this.options.activeClass);
            goog.dom.classlist.add(this.slides[a], this.options.activeClass);
            this.slides[this.current].querySelector(".uni-carousel-image").tabIndex = -1;
            this.slides[a].querySelector(".uni-carousel-image").tabIndex = 0;
            this.current = a;
            this.deltaX = 0;
            this.updateNav(a);
            this.slideWrap.style.height = this.slides[a].querySelector(this.options.slideContent).offsetHeight + "px"
        }
    },
    setFocus: function(a) {
        var b = this;
        setTimeout(function() {
            var c = b.slides[a].nodeName.toLowerCase();
            "a" === c || "button" === c || "0" ===
                b.slides[a].getAttribute("tabindex") ? b.slides[a].focus() : b.slides[a].querySelector("a[href],[tabindex]").focus()
        }, 400)
    },
    updateNav: function(a) {
        var b = this;
        this.options.infinite || (this.previousButton && (0 === a ? goog.dom.classlist.add(this.previousButton, "disabled") : goog.dom.classlist.remove(this.previousButton, "disabled")), this.nextButton && (a + 1 >= this.numSlides ? goog.dom.classlist.add(this.nextButton, "disabled") : goog.dom.classlist.remove(this.nextButton, "disabled")));
        this.bullets && 0 < this.bullets.length &&
            (Array.prototype.forEach.call(this.bullets, function(a) {
                goog.dom.classlist.remove(a, b.options.activeClass)
            }), goog.dom.classlist.add(this.bullets[a], b.options.activeClass))
    },
    dragStart: function(a) {
        var b;
        if (this.sliding) return !1;
        a = a.originalEvent || a;
        b = void 0 !== a.touches ? a.touches : !1;
        this.dragThresholdMet = !1;
        this.dragging = !0;
        this.cancel = !1;
        this.startClientX = b ? b[0].pageX : a.clientX;
        this.startClientY = b ? b[0].pageY : a.clientY;
        this.deltaY = this.deltaX = 0;
        if ("IMG" === a.target.tagName || "A" === a.target.tagName) a.target.draggable = !1;
        goog.dom.classlist.contains(a.target, "rich-text") && (this.dragging = !1)
    },
    drag: function(a) {
        var b;
        this.dragging && !this.cancel && (a = a.originalEvent || a, b = void 0 !== a.touches ? a.touches : !1, this.deltaX = (b ? b[0].pageX : a.clientX) - this.startClientX, this.deltaY = (b ? b[0].pageY : a.clientY) - this.startClientY, this.dragThresholdMet || Math.abs(this.deltaX) > Math.abs(this.deltaY) && 10 < Math.abs(this.deltaX) ? (a.preventDefault(), this.dragThresholdMet = !0, this.slide(this.deltaX + this.width * -this.current + "px"), goog.dom.classlist.add(this.handler,
            this.options.dragClass)) : Math.abs(this.deltaY) > Math.abs(this.deltaX) && 10 < Math.abs(this.deltaY) && (this.cancel = !0))
    },
    dragEnd: function() {
        this.dragging && !this.cancel && (this.dragging = !1, goog.dom.classlist.remove(this.handler, this.options.dragClass), 0 !== this.deltaX && Math.abs(this.deltaX) < this.dragThreshold ? (this.go(this.current), this.setFocus(this.current)) : 0 < this.deltaX ? (this.prev(), this.setFocus(this.current)) : 0 > this.deltaX && (this.next(), this.setFocus(this.current)))
    },
    slide: function(a, b) {
        if (b) {
            this.sliding = !0;
            goog.dom.classlist.add(this.handler, this.options.animateClass);
            var c = this;
            setTimeout(function() {
                c.sliding = !1;
                goog.dom.classlist.remove(c.handler, c.options.animateClass)
            }, 400)
        }
        this.slideWrap.style.transform = "translate3d(" + a + ", 0, 0)"
    },
    loop: function(a) {
        return (this.numSlides + a % this.numSlides) % this.numSlides
    },
    updateView: function() {
        var a = this;
        clearTimeout(this.timer);
        this.timer = setTimeout(function() {
            a.go(a.current);
            a.setWrapPosition()
        }, 300)
    },
    cloneSlides: function() {
        var a, b, c, d;
        a = this.options.offscreen ||
            1;
        b = this.options.display + a - 1;
        b = b > this.numSlides ? this.numSlides : b;
        for (d = this.numSlides; d > this.numSlides - a; d--) c = this.slides[d - 1].cloneNode(!0), c.removeAttribute("id"), c.setAttribute("aria-hidden", "true"), goog.dom.classlist.add(c, "clone"), this.slideWrap.insertBefore(c, this.slideWrap.firstChild);
        for (d = 0; d < b; d++) c = this.slides[d].cloneNode(!0), c.removeAttribute("id"), c.setAttribute("aria-hidden", "true"), goog.dom.classlist.add(c, "clone"), this.slideWrap.appendChild(c);
        this.setWrapPosition()
    },
    getWidth: function() {
        var a =
            this.slideWrap.offsetWidth;
        this.slideWrap.children.length && (a += 2 * this.slideWrap.children[0].offsetLeft);
        return a
    },
    setWrapPosition: function() {
        this.slideWrap.style.marginLeft = "calc(" + -(this.options.offscreen || 1) + "00% + " + (this.slides[0].offsetWidth - this.slides[0].offsetLeft) + "px)"
    }
});
uniblog.components.dropcap = {};
uniblog.common.component("dropcap", {
    init: function() {
        var a = this.handler.querySelector(".uni-paragraph .rich-text"),
            b, c;
        a && (b = this.searchForFirstText(a.childNodes)) && (c = document.createElement("div"), c.innerText = b.textContent[0], goog.dom.classlist.add(c, "uni-dropcap"), b.textContent = b.textContent.substring(1), a.firstChild ? a.insertBefore(c, a.firstChild) : a.appendChild(c))
    },
    searchForFirstText: function(a) {
        for (var b = a.length, c, d = 0; d < b; d++)
            if (c = a[d].textContent.trim(), c.length) {
                c = a[d].childNodes;
                if (c.length) return this.searchForFirstText(c);
                if (a[d].nodeType === Node.TEXT_NODE) return a[d]
            }
    }
});
uniblog.components.articleSearchController = {};
uniblog.common.extend("searchController", "articleSearchController", {
    keywordLabel: [],
    setElements: function() {
        this.counterLabel = goog.dom.getElementByClass("uni-search-results-counter", this.handler);
        this.keywordLabel = goog.dom.getElementsByClass("uni-search-results-keyword", this.handler);
        this.noResultsHandler = this.handler.querySelector(".uni-no-results")
    },
    updateKeyword: function() {
        var a = this.searchObject.q;
        Array.prototype.forEach.call(this.keywordLabel, function(b) {
            b.innerText = a
        })
    },
    updateCounter: function(a) {
        this.counterLabel.innerText =
            a.count;
        this.updateKeyword();
        goog.dom.classlist.remove(this.handler, "uni-has-no-results");
        goog.dom.classlist.remove(this.handler, "uni-has-no-filters")
    },
    track: function(a) {
        if (1 == a.current) {
            var b = {
                event: "page interaction",
                category: "search",
                action: "search results loaded",
                label: ""
            };
            b.label += "keyword:" + this.searchObject.q + "|";
            b.label += "product filter:" + (this.searchObject.product_tag || "all products") + "|";
            b.label += "topic filter:" + (this.searchObject.topic_tag || "all topics") + "|";
            b.label += "date filter:" + (this.searchObject.date ||
                "all dates") + "|";
            b.label += "results:" + a.count;
            b.label = b.label.toLowerCase();
            window.dataLayer.push(b)
        }
    },
    render: function(a) {
        0 == a.count ? (a = {
            q: this.searchObject.q,
            // random_url: "/random/",
            // latest_url: "/",
            // about_google_url: "//google.com/about",
            // press_corner_url: "/press/"
            username: this.options.username,
            random_url: this.options.base_url + "/random",
            latest_url: this.options.base_url,
            about_google_url: this.options.base_url + "/about"
        }, this.reset(), this.noResultsHandler.innerHTML = uniblog.templates.noResultsPage(a), uniblog.components.init(this.noResultsHandler)) : (this.updateCounter(a), this.noResultsHandler.innerText = "")
    },
    reset: function() {
        this.updateKeyword();
        goog.dom.classlist.add(this.handler,
            "uni-has-no-results");
        goog.string.isEmptySafe(this.searchObject.topic_tag) && goog.string.isEmptySafe(this.searchObject.product_tag) && goog.string.isEmptySafe(this.searchObject.date) ? goog.dom.classlist.add(this.handler, "uni-has-no-filters") : goog.dom.classlist.remove(this.handler, "uni-has-no-filters")
    }
});
uniblog.components.selectionSharer = {};
uniblog.common.component("selectionSharer", {
    activeClass: "uni-selection-sharer-active",
    enabled: !1,
    links: [],
    onMouseUpHandler: {},
    popup: {},
    popupWidth: 140,
    range: {},
    selectedText: "",
    init: function() {
        uniblog.utils.isTouchDevice || (this.setElements(), this.setEvents())
    },
    setElements: function() {
        this.popup = document.querySelector(".uni-selection-sharer");
        this.links = this.popup.querySelectorAll("a")
    },
    setEvents: function() {
        document.addEventListener("mousedown", this.onMouseDown.bind(this));
        window.addEventListener("resize",
            this.closePopup.bind(this), !1);
        Array.prototype.forEach.call(this.links, function(a) {
            a.addEventListener("mousedown", this.onLinkMouseDown.bind(this))
        }.bind(this))
    },
    onLinkMouseDown: function(a) {
        a = goog.dom.dataset.get(a.currentTarget, "link");
        a = a.replace("{ $text }", this.selectedText);
        this.closePopup();
        window.open(a, "_blank", "width=680,height=460")
    },
    onMouseDown: function(a) {
        this.onMouseUpHandler = this.onMouseUp.bind(this);
        document.addEventListener("mouseup", this.onMouseUpHandler);
        this.selectedText = "";
        this.popup.contains(a.target) ||
            this.closePopup();
        this.clearSelection()
    },
    onMouseUp: function(a) {
        var b, c;
        this.selectedText = this.getSelectedText();
        this.range.startContainer && (b = this.range.endContainer.parentNode, c = this.range.startContainer.parentNode, this.selectedText && this.handler.contains(b) && this.handler.contains(c) && this.openPopup(a));
        document.removeEventListener("mouseup", this.onMouseUpHandler)
    },
    clearSelection: function() {
        window.getSelection ? window.getSelection().empty ? window.getSelection().empty() : window.getSelection().removeAllRanges &&
            window.getSelection().removeAllRanges() : document.selection && document.selection.empty()
    },
    openPopup: function(a) {
        if (a = this.getPopupPosition(a, this.handler)) this.popup.style.top = a.y + "px", this.popup.style.left = a.x + "px", goog.dom.classlist.add(this.popup, this.activeClass)
    },
    closePopup: function() {
        goog.dom.classlist.remove(this.popup, this.activeClass)
    },
    getPopupPosition: function(a, b) {
        if (this.range.startContainer) {
            var c = uniblog.utils.getMousePosition(a, b),
                d = this.range.endContainer.parentNode,
                e = this.range.startContainer.parentNode,
                f = d.getBoundingClientRect(),
                g = this.handler.getBoundingClientRect(),
                e = uniblog.utils.getElementPosition(e, this.handler),
                h = uniblog.utils.getElementPosition(d, this.handler),
                k = this.popupWidth / 2,
                l = Math.max(e.x, k),
                g = Math.min(g.width + g.left, h.x + f.width),
                f = h.y - f.height,
                h = c.x,
                c = c.y;
            h < l ? h = l : h > g - k && (h = 85 > Math.abs(h - g) ? g - k : l);
            c < e.y ? c = e.y : 30 > Math.abs(c - e.y) ? c = e.y : 30 > Math.abs(c - f.y) && (d = getComputedStyle(d)["font-size"].replace("px", ""), c = f - d);
            return {
                x: h,
                y: c
            }
        }
        return null
    },
    getSelectedText: function() {
        var a = "",
            b;
        if ("undefined" !=
            typeof window.getSelection) {
            if (b = window.getSelection(), b.rangeCount) {
                for (var a = document.createElement("div"), c = 0, d = b.rangeCount; c < d; ++c) this.range = b.getRangeAt(c), a.appendChild(this.range.cloneContents());
                a = a.innerText
            }
        } else "undefined" != typeof document.selection && "Text" == document.selection.type && (a = document.selection.createRange().htmlText);
        return a.trim().replace(/\s\s+/g, " ")
    }
});
uniblog.components.externalLinks = {};
uniblog.common.component("externalLinks", {
    init: function() {
        var a = this.handler.querySelectorAll("a"),
            a = Array.prototype.filter.call(a, uniblog.utils.isExternalLink.bind(uniblog.utils));
        Array.prototype.forEach.call(a, function(a) {
            a.target = "_blank"
        })
    }
});
uniblog.components.init = function(a) {
    uniblog.components.initByType(a, "component");
    uniblog.components.initByType(a, "controller")
};
uniblog.components.initByType = function(a, b) {
    var c = "uni-" + b,
        d = a.querySelectorAll("[" + c + "]:not(.uni-initialized)");
    Array.prototype.forEach.call(d, function(a) {
        var b = a.getAttribute(c);
        uniblog.components[b] && (new uniblog.components[b](a), goog.dom.classlist.add(a, "uni-initialized"))
    })
};
uniblog.main = function() {
    uniblog.utils.isTouchDevice && goog.dom.classlist.add(document.body, "uni-is-touch");
    uniblog.utils.isMobile ? goog.dom.classlist.add(document.body, "uni-is-mobile") : uniblog.utils.isTablet && goog.dom.classlist.add(document.body, "uni-is-tablet");
    uniblog.utils.isIE() && goog.dom.classlist.add(document.body, "uni-is-ie");
    window.dataLayer || (window.dataLayer = []);
    uniblog.components.init(document);
    uniblog.eventListener.add("tap", document)
};

function startApp() {
    setTimeout(function() {
        new uniblog.main
    })
}
goog.exportSymbol("uniblog.main", uniblog.main);
"loading" !== document.readyState ? startApp() : document.addEventListener("DOMContentLoaded", startApp, !1);

if ("undefined" == typeof uniblog) var uniblog = {};
if ("undefined" == typeof uniblog.templates && (uniblog.templates = {}), uniblog.templates.googlePlusFeeds = function(e, a) {
        for (var t = "", s = e.items, i = s.length, l = 0; l < i; l++) {
            var o = s[l];
            if (t += '<div class="uni-social-feed uni-social-feed-google-plus"><div class="uni-social-feed-header"><figure><img alt="' + soy.$$escapeHtml(o.profile.displayName) + '" src="' + soy.$$escapeHtml(o.profile.img) + '"/></figure><div><a class="uni-social-feed-user-name" href="https://plus.google.com/' + soy.$$escapeHtml(o.profile.id) + '" target="_blank">' + soy.$$escapeHtml(o.profile.displayName) + '</a><a class="uni-social-feed-user-account" href="https://plus.google.com/' + soy.$$escapeHtml(o.profile.id) + '" target="_blank">Shared Publicly</a><time datetime="' + soy.$$escapeHtml(o.created_at) + '">' + soy.$$escapeHtml(o.created_since) + '</time></div><i></i></div><div class="uni-social-feed-content"><div class="uni-social-feed-content-wrapper">' + ("share" == o.type ? "<p>" + soy.$$filterNoAutoescape(o.annotation) + "</p>" : "") + '<div class="inner-wrapper' + ("share" == o.type ? " uni-share-wrapper" : "") + '"><div class="uni-post-content">' + ("share" == o.type ? "<p>" + soy.$$escapeHtml(o.author.name) + ' <a href="' + soy.$$escapeHtml(o.og_url) + '"> originally shared: </a></p>' : "") + "<p>" + soy.$$filterNoAutoescape(o.content) + "</p>", o.media)
                for (var n = o.media, r = n.length, c = 0; c < r; c++) {
                    var u = n[c];
                    t += "photo" == u.objectType ? '<figure><img alt="plus image" src="' + soy.$$escapeHtml(u.image.url) + '" /></figure>' : "event" == u.objectType || "article" == u.objectType || "video" == u.objectType ? '<a href="' + soy.$$escapeHtml(u.url) + '"> ' + soy.$$escapeHtml(u.url) + " </a>" : ""
                }
            t += '</div></div></div></div><div class="uni-social-feed-footer"><a class="uni-social-feed-share" href="https://plus.google.com/share?url=' + soy.$$escapeHtml(o.url) + '" target="_blank">' + soy.$$escapeHtml(o.num_reshares) + "</a><div class=\"uni-social-google-like-button\" uni-options=\"{'href': '" + soy.$$escapeHtml(o.url) + "', 'size': 'standard'}\"></div><a class=\"uni-google-plus-post-link\" href=\"" + soy.$$escapeHtml(o.url) + '" target="_blank">View on Google+</a></div></div>'
        }
        return t
    }, "undefined" == typeof uniblog) var uniblog = {};
if ("undefined" == typeof uniblog.templates && (uniblog.templates = {}), uniblog.templates.articleItem = function(e, a) {
        return '<a href="' + soy.$$escapeHtml(e.url) + '"><div class="uni-article-item-header">' + uniblog.templates.timestamp(e) + "<span>" + soy.$$escapeHtml(e.primary_tag_obj.display_name) + "</span></div>" + (e.image_obj ? uniblog.templates.responsiveImage({
            figure: e.image_obj
        }) : "") + "<section><h2>" + soy.$$escapeHtml(e.title) + "</h2>" + (e.summary ? "<p>" + soy.$$escapeHtml(e.summary) + " </p>" : "") + "</section></a>"
    }, "undefined" == typeof uniblog) var uniblog = {};
if ("undefined" == typeof uniblog.templates && (uniblog.templates = {}), uniblog.templates.pressImageList = function(e, a) {
        for (var t = "<div class=\"uni-press-image-list-item\" tabindex=\"0\" uni-component=\"modal\" uni-options=\"{'template': 'imageFeatures', 'data': {'title': '" + uniblog.utils.replaceQuotations({
                text: e.title
            }) + "', 'subtitle': '" + uniblog.utils.replaceQuotations({
                text: e.subtitle
            }) + "', 'tags': [", s = e.tags, i = s.length, l = 0; l < i; l++) {
            var o = s[l];
            t += (0 != l ? "," : "") + "{'name': '" + uniblog.utils.replaceQuotations({
                text: o.display_name
            }) + "', 'url': '" + soy.$$escapeHtml(o.landing_page_url) + "', 'analytics_type': '" + soy.$$escapeHtml(o.analytics_type) + "'}"
        }
        return t += "], 'image': '" + soy.$$escapeHtml(e.image_url) + "', 'height': '" + soy.$$escapeHtml(e.height) + "', 'width': '" + soy.$$escapeHtml(e.width) + "', 'file_size': '" + soy.$$escapeHtml(e.file_size) + "', 'url': '" + soy.$$escapeHtml(e.download_url) + "'}}\"><div class=\"uni-press-image-list-item-container\" uni-component=\"analytics\" data-analytics=\"{'category': 'asset view', 'action': 'asset', 'label': 'asset:" + uniblog.utils.toLowerCase({
            text: e.title
        }) + "'}\" uni-options=\"{'clickable': 'true'}\">" + uniblog.templates.responsiveImage({
            figure: e.image_obj
        }) + '<div class="uni-press-image-list-item-title"><h2>' + soy.$$escapeHtml(e.title) + '</h2><div class="uni-press-image-list-overlay"><div class="uni-press-image-list-info"><h2>' + soy.$$escapeHtml(e.title) + "</h2>" + (e.subtitle ? '<span class="show-large hide-tablet">' + soy.$$escapeHtml(e.subtitle) + "</span>" : "") + '</div><a class="show-large hide-tablet" href="' + soy.$$escapeHtml(e.download_url) + "\" aria-label=\"Download\" uni-component=\"analytics\" data-analytics=\"{'category': 'download', 'action': 'asset', 'label': 'asset: " + uniblog.utils.replaceQuotations({
            text: e.title
        }) + "'}\" uni-options=\"{'stopPropagation': 'true'}\"></a></div></div></div></div>"
    }, "undefined" == typeof uniblog) var uniblog = {};
if ("undefined" == typeof uniblog.templates && (uniblog.templates = {}), uniblog.templates.responsiveImage = function(e, a) {
        var t = "";
        if (e.figure && e.figure.sources && e.figure.sources.length) {
            t += "<figure><picture>";
            for (var s = e.figure.sources, i = s.length, l = 0; l < i; l++) {
                var o = s[l];
                t += '<source media="' + soy.$$escapeHtml(o.media) + '" sizes="' + soy.$$escapeHtml(o.width) + 'px" srcset="' + soy.$$escapeHtml(o.srcset) + '">'
            }
            t += '<img src="' + soy.$$escapeHtml(e.figure.src) + '"' + (e.alt ? 'alt="' + soy.$$escapeHtml(e.alt) + '"' : 'alt="' + soy.$$escapeHtml(e.figure.alt) + '"') + 'sizes="' + soy.$$escapeHtml(e.figure.sizes) + '" srcset="' + soy.$$escapeHtml(e.figure.srcset) + '"></picture></figure>'
        }
        return t
    }, "undefined" == typeof uniblog) var uniblog = {};
if ("undefined" == typeof uniblog.templates && (uniblog.templates = {}), uniblog.templates.timestamp = function(e, a) {
        return e.published_at ? '<time class="uni-timesince" datetime="' + soy.$$escapeHtml(e.published_at) + '">' + soy.$$escapeHtml(e.published_since) + "</time>" : ""
    }, "undefined" == typeof uniblog) var uniblog = {};
if ("undefined" == typeof uniblog.templates && (uniblog.templates = {}), uniblog.templates.imageFeatures = function(e, a) {
        var t = '<div class="uni-image-features"><figure><img src="' + soy.$$escapeHtml(e.image) + '" alt="' + soy.$$escapeHtml(e.title) + '"></figure><section><div class="uni-image-features-details"><h1>' + soy.$$escapeHtml(e.title) + "</h1>" + (e.subtitle ? "<h2>" + soy.$$escapeHtml(e.subtitle) + "</h2>" : "");
        if (e.tags.length) {
            t += "<div class=\"uni-image-features-tags hide-small\"><nav uni-component=\"analytics\" data-analytics=\"{'category': 'landing page lead', 'action': 'asset'}\"><span>Posted in:</span>";
            for (var s = e.tags, i = s.length, l = 0; l < i; l++) {
                var o = s[l];
                t += "null" != o.url ? '<a href="' + soy.$$escapeHtml(o.url) + "\" data-analytics=\"{'label': '" + soy.$$escapeHtml(o.analytics_type) + ": {name}'}\">" + soy.$$escapeHtml(o.name) + "</a>" : '<a class="uni-link-disabled">' + soy.$$escapeHtml(o.name) + "</a>"
            }
            t += "</nav></div>"
        }
        return t += "</div><div class=\"uni-image-features-download\"><div class=\"uni-image-features-download-button\" uni-component=\"analytics\" data-analytics=\"{'category': 'download', 'action': 'asset', 'label': 'asset: " + soy.$$escapeHtml(e.title) + '\'}"><a class="hide-small" href="' + soy.$$escapeHtml(e.url) + '">Download image</a><a class="show-small" href="' + soy.$$escapeHtml(e.url) + '">Download</a></div><span class="hide-small">' + soy.$$escapeHtml(e.width) + "x" + soy.$$escapeHtml(e.height) + " pixels</span>" + ("None" != e.file_size ? '<span class="hide-small"> - ' + soy.$$escapeHtml(Math.round(e.file_size / 1048576 * 100) / 100) + " Mb</span>" : "") + "</div></section></div>"
    }, "undefined" == typeof uniblog) var uniblog = {};
if ("undefined" == typeof uniblog.templates && (uniblog.templates = {}), uniblog.templates.newsItem = function(e, a) {
        return '<a href="' + soy.$$escapeHtml(e.url) + '">' + uniblog.templates.responsiveImage({
            figure: e.image_obj
        }) + '<div class="uni-article-item-header ' + soy.$$escapeHtml(e.accent_color) + '">' + uniblog.templates.timestamp(e) + "<span>" + soy.$$escapeHtml(e.primary_tag_obj.display_name) + "</span></div><h2>" + soy.$$escapeHtml(e.title) + "</h2></a>"
    }, "undefined" == typeof uniblog) var uniblog = {};
if ("undefined" == typeof uniblog.templates && (uniblog.templates = {}), uniblog.templates.noResultsPage = function(e, a) {
        return e = e || {}, "<div class=\"uni-wrapper\"><div class=\"uni-no-results-alignment\" uni-component=\"externalLinks\"><p>Try changing it up, or :</p><ul uni-component=\"analytics\" data-analytics=\"{'category': 'article lead', 'action': 'search result zero', 'label': 'article: {slug}'}\"><li>Feeling lucky? Take your chances with a <a href=\"" + soy.$$escapeHtml(e.random_url) + "\" data-analytics=\"{'action': 'random article - search result zero'}\">random article</a> from our archives</li><li><a href=\"" + soy.$$escapeHtml(e.latest_url) + "\" data-analytics=\"{'action': 'latest from ink - search result zero', 'label': 'article: home'}\">Read the latest from The Keyword</a></li></ul><ul uni-component=\"analytics\" data-analytics=\"{'category': 'navigation', 'action': 'search result zero', 'label': 'article: {slug}'}\"><li>Learn even more <a href=\"" + soy.$$escapeHtml(e.about_google_url) + '">about Google</a></li><li>Member of the press? Find media assets in our <a href="' + soy.$$escapeHtml(e.press_corner_url) + '">Press Corner</a></li></ul><ul uni-component="analytics" data-analytics="{\'category\': \'social\', \'action\': \'follow - search result zero\', \'label\': \'social network: {name}|account:uniblog\'}"><li>Follow us on social :<nav class="uni-social-network"><a class="uni-icon-google" target="_blank" href="//plus.google.com/116899029375914044550" aria-label="Google+"></a><a class="uni-icon-twitter" target="_blank" href="//twitter.com/google" aria-label="Twitter"></a><a class="uni-icon-facebook" target="_blank" href="//www.facebook.com/Google" aria-label="Facebook"></a></nav></li></ul></div></div>'
    }, "undefined" == typeof uniblog) var uniblog = {};
if ("undefined" == typeof uniblog.templates && (uniblog.templates = {}), uniblog.templates.twitterFeeds = function(e, a) {
        for (var t = "", s = e.items, i = s.length, l = 0; l < i; l++) {
            var o = s[l];
            if (t += '<div class="uni-social-feed uni-social-feed-twitter"><div class="uni-social-feed-header"><figure><img alt="' + soy.$$escapeHtml(o.user_screen_name) + '" src="' + soy.$$escapeHtml(o.user_picture) + '"/></figure><div><a class="uni-social-feed-user-name" href="https://twitter.com/' + soy.$$escapeHtml(o.user_name) + '" target="_blank">' + soy.$$escapeHtml(o.user_screen_name) + '</a><a class="uni-social-feed-user-account" href="https://twitter.com/' + soy.$$escapeHtml(o.user_name) + '" target="_blank">@' + soy.$$escapeHtml(o.user_name) + '</a><time datetime="' + soy.$$escapeHtml(o.created_at) + '">' + soy.$$escapeHtml(o.created_since) + '</time></div><i></i></div><div class="uni-social-feed-content"><div class="uni-social-feed-content-wrapper"><p>' + soy.$$filterNoAutoescape(o.text) + "</p>", o.entities && o.entities.media)
                for (var n = o.entities.media, r = n.length, c = 0; c < r; c++) {
                    var u = n[c];
                    t += "photo" == u.type ? '<figure><img alt="twitter image" src="' + soy.$$escapeHtml(u.media_url_https) + '" /></figure>' : ""
                }
            t += '</div></div><div class="uni-social-feed-footer"><a class="uni-social-feed-reply" href="https://twitter.com/intent/tweet?in_reply_to=' + soy.$$escapeHtml(o.id) + '" target="_blank" aria-label="Retweet"></a><a class="uni-social-feed-retweet" href="https://twitter.com/intent/retweet?tweet_id=' + soy.$$escapeHtml(o.id) + '" target="_blank" aria-label="Retweet">' + soy.$$escapeHtml(o.retweet_count) + '</a><a class="uni-social-feed-like" href="https://twitter.com/intent/like?tweet_id=' + soy.$$escapeHtml(o.id) + '" target="_blank" aria-label="Like">' + soy.$$escapeHtml(o.favorite_count) + "</a></div></div>"
        }
        return t
    }, "undefined" == typeof uniblog) var uniblog = {};
"undefined" == typeof uniblog.templates && (uniblog.templates = {}), uniblog.templates.typeAheadList = function(e, a) {
    for (var t = "<ul>", s = e.items, i = s.length, l = 0; l < i; l++) {
        var o = s[l];
        t += '<li><a href="' + soy.$$escapeHtml(o.url) + '">' + soy.$$escapeHtml(o.title) + (o.content_type_display_name ? "<p>" + soy.$$escapeHtml(o.content_type_display_name) + "</p>" : "") + "</a></li>"
    }
    return t += "</ul>"
};