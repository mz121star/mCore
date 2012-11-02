/**
 * Created with JetBrains WebStorm.
 * User: C-Jarrick.Miao
 * Date: 11/1/12
 * Time: 12:21 PM
 * To change this template use File | Settings | File Templates.
 */
(function (mcore) {

    var _imgOperate = function () {
        return{
            preLoadImages:function (arr) {
                var newimages = [], loadedimages = 0;
                var postaction = function () {
                };
                var arr = (typeof arr != "object") ? [arr] : arr;

                function imageloadpost() {
                    loadedimages++;
                    if (loadedimages == arr.length) {
                        postaction(newimages)
                    }
                }

                ;
                for (var i = 0; i < arr.length; i++) {
                    newimages[i] = new Image();
                    newimages[i].src = arr[i];
                    newimages[i].onload = function () {
                        imageloadpost();
                    }
                    newimages[i].onerror = function () {
                        imageloadpost();
                    }
                }
                return {
                    done:function (f) {
                        postaction = f || postaction;
                    }
                };
            }
        };
    };

    mcore.Image = new _imgOperate();

})(mCore);