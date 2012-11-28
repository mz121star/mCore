/**
 * Created with JetBrains WebStorm.
 * User: C-Jarrick.Miao
 * Date: 11/1/12
 * Time: 12:19 PM
 * To change this template use File | Settings | File Templates.
 */
(function (window) {

    var window = window;
    var document =window.document;

    var mcore = function () {
        return{
            extend:function (subClass, superClass) {
                var F = function () { };
                F.prototype = superClass.prototype;
                subClass.prototype = new F();
                subClass.prototype.constructor = subClass;
                subClass.superclass = superClass.prototype;
                if (superClass.prototype.constructor == Object.prototype.constructor) {
                    superClass.prototype.constructor = superClass;
                };
            },
            clone:function (cloneClass) {
                var F = function () {  };
                F.prototype = cloneClass;
                return new F();
            },
            augment:function (receivingClass, givingClass, params) {
                if (params) {
                    console.log('' + params.join(','));
                    for (var i = 0, len = params.length; i < len; i++) {
                        receivingClass.prototype[params[i]] = givingClass.prototype[params[i]];
                    }
                }
                else {
                    for (var methodName in givingClass.prototype) {
                        if (!receivingClass.prototype[methodName]) {
                            receivingClass.prototype[methodName] = givingClass.prototype[methodname];
                        }
                    }
                }
            },
            loadScript:function (url, callback) {
                var script = document.createElement("script");
                script.type = "text/javascript";
                if (script.readyState) { //IE
                    script.onreadystatechange = function () {
                        if (script.readyState == "loaded" || script.readyState == "complete") {
                            script.onreadystatechange = null;
                            callback();
                        }
                     };
                } else { //Others
                    script.onload = function () {
                        callback();
                    };

                }
                script.src = url;
                document.getElementsByTagName("head")[0].appendChild(script);
                return this;
            },
            is_array:function(value){
                return value && typeof value === 'object' && typeof  value.length === 'number' && typeof value.splice === 'function' && !(value.propertyIsEnumerable('length'));
            }

        };
    };

    //var m = new mcore();
    window.mCore = window.m$ = mcore();

    if (typeof define === "function" && define.amd && define.amd.mCore) {
        define("mCore", [], function () {
             mcore();
        });
    }

})(window);