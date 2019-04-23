app.controller('log', function ($scope, $http, toaster, $window, $location) {
    var locationURL = $location.absUrl();
    var baseURL = "http://" + $location.host() + "/form-image.php";
    var baseURL2 = "http://" + $location.host() + "/viewG.php";
    $scope.page_upload = function () {
        location.href = "form-image.php";
    }
    $scope.view_gallery = function () {
        location.href = "viewG.php";
    }
    $scope.resetForm = function () {
        var original = angular.copy($scope.user);
        $scope.user = angular.copy(original);
        $scope.userForm.$setPristine();
    }
    $scope.session = function () {
        $http.get('angular-scripts/backend/sesiondata.php').then(function (data) {
            log = data.data;
            $scope.user = log;
            if (log[0].auth == false && locationURL === baseURL || log[0].auth == false && locationURL === baseURL2) {
                location.href = "index.php";
            }
            // console.log($scope.user);
        }).catch(function (err) {
            console.log(err);
        });
    }
    $scope.session();
    $scope.showLock = function (state) {
        if (state == false) {
            return 'show';
        }
    }
    $scope.showUser = function (state) {
        if (state != false) {
            return 'show';
        }
    }
    $scope.LogOut = function () {
        $http({
            url: "angular-scripts/backend/logout.php",
            type: "post",
            dataType: "json",
        }).then(function (data) {
            if (data.data.cerrar) {
                toaster.pop('success', "Message", data.data.cerrar);
                $scope.session();
            }
        }).catch(function (errorThrown, StatusText) {
            console.log(errorThrown.responseText);
        });
    }
    $scope.log_in = function () {
        if ($scope.userForm.$valid) {
            $http({
                url: "angular-scripts/backend/login.php",
                type: "post",
                dataType: "json",
                params: {
                    login: $scope.user.login,
                    pass: $scope.user.password
                },
            }).then(function (data) {
                // console.log(data.data);
                var msj = data.data;
                if (msj.success != null) {
                    $('#log').modal('hide');
                    toaster.pop('success', "Message", msj.success);
                    $scope.session();
                } else {
                    toaster.pop('error', "Message", msj.error);
                }
            }).catch(function (errorThrown, StatusText) {
                console.log(errorThrown.responseText);
            });
        }
    }
    $scope.instagram = function () {
        $window.open('https://www.instagram.com/sanchezofficefurniture/', '_blank');
    }
    $scope.facebook = function () {
        $window.open('https://www.facebook.com/sanchezofficefurniture/', '_blank');
    }
});

app.controller('mail', function ($scope, $http, toaster) {
    $scope.resetFormE = function () {
        var original = angular.copy($scope.email);
        $scope.email = angular.copy(original);
        $scope.emailform.$setPristine();
    }
    $scope.SubmitEmail = function () {
        if ($scope.emailform.$valid) {
            $http({
                url: "angular-scripts/backend/email.php",
                type: "post",
                dataType: "json",
                params: {
                    // name: $scope.email.name,
                    mail: $scope.email.mail,
                    // phone:$scope.email.phone,
                    // msg: $scope.email.msg
                },
            }).then(function (data) {
                var msj = data.data;
                console.log()
                if (true) {
                    toaster.pop('success', "Mensaje Enviado", msj.success);
                    $scope.resetFormE();
                } else {
                    toaster.pop('error', "asdasd", msj.error);
                }
            }).catch(function (errorThrown, StatusText) {
                console.log(errorThrown.responseText);
            });
        }
    }
});

app.controller('images', function ($scope, $http, toaster, $compile, $location) {
    $scope.generarFormImg = function () {
        $('#form').empty();
        var newEle = angular.element('<form name="uploadimages" id="uploadimages" ng-submit="SubmitUploadImages()" enctype="multipart/form-data"><div class="row pages-cont"> <div class="form-group"> <div class="col-sm-12"> <label for="placa"><font color="black">Titulo:</font></label> <input type="text" maxlength="40" class="input" ng-model="images.desc" name="desc" id="desc" placeholder="Description"> </div></div><div class="form-group"> <div class="col-sm-12"> <div class="avatar" ng-show="uploadimages.file.$invalid"> <h1>Click para subir la imagen</h1> <input type="file" ngf-select ng-model="images.picFile" name="file" accept="image/*" ngf-max-size="2MB" required ngf-model-invalid="errorFile"> <span ng-show="uploadimages.file.$error.required">*requerido</span><br><i ng-show="uploadimages.file.$error.maxSize">Archivo muy pesado{{errorFile.size / 1000000|number:1}}MB: max 2M</i> </div><br><div class="avatar" ng-show="uploadimages.file.$valid"> <img ngf-thumbnail="images.picFile" class="avatar"><br><button style="position: absolute;top: 2px;right: 2px;" class="btn btn-danger" type="button" ng-click="images.picFile=null" ng-show="images.picFile">X</button> </div></div></div></div><div class="form-group"> <div class="col-sm-12" align="center"> <button type="submit" ng-disabled="uploadimages.$invalid" class="btn btn-primary bg-primary">Submit</button> </div></div></form>');
        var target = document.getElementById('form');
        angular.element(target).append($compile(newEle)($scope));
    }
    $scope.SubmitUploadImages = function () {
        if ($scope.uploadimages.$valid) {
            var formData = new FormData(document.getElementById("uploadimages"));
            $.ajax({
                url: "angular-scripts/backend/images.php",
                type: "post",
                dataType: "json",
                data: formData,
                cache: false,
                contentType: false,
                processData: false
            }).done(function (data) {
                // console.log(data);
                if (data.success != null) {
                    $scope.images = {};
                    $scope.generarFormImg();
                    return toaster.pop('success', "Message", data.success);
                } else {
                    return toaster.pop('error', "Message", data.error);
                }
            }).fail(function (errorThrown, StatusText) {
                console.log(errorThrown.responseText);
            })
        }
    }
    $scope.contadorClass = function () {
        window.setTimeout(function () {
            contador = document.getElementsByClassName("contando").length;
            $('#contadorClass').val(contador);
        }, 100);
    }
    $scope.seeGallery = function () {
        location.href = "gallery.php";
    }

    function ConvertType(value) {
        try {
            return (new Function("return " + value + ";"))();
        } catch (e) {
            return value;
        }
    };
    $scope.imgG = function (params) {
        var bool = ConvertType(params);
        $scope.showLoader = true;
        $http({
            method: 'POST',
            url: 'angular-scripts/backend/imagenes.php?all=' + bool,
        }).then(function (data) {
            $scope.gallery = data.data;
            $scope.showLoader = false;
            // console.log($scope.gallery);
        }).catch(function (err) {
            console.log(err);
        });
    }
    // $scope.imgG();
    $scope.delImg = function (id) {
        $http({
            url: "angular-scripts/backend/ImageSupr.php",
            type: "post",
            dataType: "json",
            params: {
                idimagen: id
            },
        }).then(function (data) {
            // console.log(data);
            var msj = data.data;
            if (msj.success != null) {
                toaster.pop('success', "Message", msj.success);
                $scope.imgG(true);
            } else {
                toaster.pop('error', "Message", msj.error);
            }
        }).catch(function (errorThrown, StatusText) {
            console.log(errorThrown.responseText);
        });
    }

    $scope.modalOpen = function (desc, id, imagen) {
        $('#modprod').modal('show');
        $scope.update = {};
        $scope.update.desc = desc;
        $scope.update.idimg = parseInt(id);
        $scope.imagen = imagen;
    }

    $scope.UpdateProduct = function (form) {
        if (form.$valid) {
            $http({
                url: "angular-scripts/backend/updateProd.php",
                type: "post",
                dataType: "json",
                params: {
                    desc: $scope.update.desc,
                    idimg: $scope.update.idimg
                },
            }).then(function (data) {
                var msj = data.data;
                if (msj.success != null) {
                    toaster.pop('success', "Message", msj.success);
                    $('#modprod').modal('hide');
                    $scope.imgG(true);
                } else {
                    toaster.pop('error', "Message", msj.error);
                }
            }).catch(function (errorThrown, StatusText) {
                throw (errorThrown.responseText);
            });
        }
    }

    this.items = $scope.gallery;
    this.tab = 1;
    this.filtText = '';

    this.select = function (setTab) {
        this.tab = setTab;
        if (setTab === 2) {
            this.filtText = "home";
            return this.filtText;
        } else if (setTab === 3) {
            this.filtText = "tables";
            return this.filtText;
        } else if (setTab === 4) {
            this.filtText = "workstation";
            return this.filtText;
        } else if (setTab === 5) {
            this.filtText = "seating";
            return this.filtText;
        } else if (setTab === 6) {
            this.filtText = "conference";
            return this.filtText;
        } else if (setTab === 7) {
            this.filtText = "case";
            return this.filtText;
        } else if (setTab === 8) {
            this.filtText = "storage";
            return this.filtText;
        } else {
            this.filtText = "";
            return this.filtText;
        }
    }
    this.isSelected = function (checkTab) {
        return (this.tab === checkTab);
    }
});