"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);

var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)()

// when loginRequired:  JWT via loginRequired middleware identifies the id to be updated

router.get('/', _loginRequired2.default, _UserController2.default.index)
router.post('/', _UserController2.default.store)
router.get('/:id', _loginRequired2.default, _UserController2.default.show) // user can see others
router.put('/', _loginRequired2.default, _UserController2.default.update) // user only updates their own account
router.delete('/', _loginRequired2.default, _UserController2.default.delete) // user only deletes their own account

exports. default = router
