
export function parseHash (hash_data) {
	var hash = hash_data.split('#')[1] || ''
	return hash
}
export function formatNumber (str, unit='', isPrice=false) {
    if (isPrice) {
        if(str==undefined){
            return lang("call_for_price");
        }
    }
    var s = Math.round(str * 100) / 100;
    s = s.toString();
    var l = s.lastIndexOf('.');
    if (l < 0) l = s.length;
    else s = s.slice(0, l) + ',' + s.slice(l + 1);
    if (l <= 3) {
        return s + (unit!='' ? (' ' +unit) : '')
    }

    if (isPrice) {
        var sn = s;
        s = formatNumber(sn.slice(0, l - 3), 'tỷ', false)
        if (sn.slice(l - 3, l) != "000") {
            s = s + " " + sn.slice(l - 3) + (unit!='' ? (' ' +unit) : '')
        }
        return s;
    }
    for (var i = l - 3; i > 0; i -= 3) {
        s = s.slice(0, i) + '.' + s.slice(i);
    }
    return s + (unit!='' ? (' ' +unit) : '')
}
export function renderPriceInputLabel (initPrice = '') {
    if (initPrice !== '') {
      initPrice = Number(String(initPrice).replace(/\./g, ''))
      if (initPrice > 1000000) {
        initPrice = formatNumber(initPrice / 1000000, 'triệu', true)
        return initPrice
      }
    }
    return null
  }
export function serializeFormObject(form) {
    if (!form || form.nodeName !== "FORM") {
        return;
    }
    var i, j, q = {};
    for (i = form.elements.length - 1; i >= 0; i = i - 1) {
        if (form.elements[i].name === "") {
            continue;
        }
        switch (form.elements[i].nodeName) {
        case 'INPUT':
            switch (form.elements[i].type) {
            case 'text':
            case 'email':
            case 'hidden':
            case 'password':
            case 'button':
            case 'reset':
            case 'number':
            case 'submit':
                q[form.elements[i].name] = form.elements[i].value;
                break;
            case 'checkbox':
            case 'radio':
                if (form.elements[i].checked) {
                    q[form.elements[i].name] = form.elements[i].value;
                }
                break;
            }
            break;
            case 'file':
            break;
        case 'TEXTAREA':
            q[form.elements[i].name] = form.elements[i].value;
            break;
        case 'SELECT':
            switch (form.elements[i].type) {
            case 'select-one':
                q[form.elements[i].name] = form.elements[i].value;
                break;
            case 'select-multiple':
                var tmp = []
                for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                    if (form.elements[i].options[j].selected) {

                        tmp.push(form.elements[i].options[j].value);
                    }
                }
                q[form.elements[i].name] = tmp
                break;
            }
            break;
        case 'BUTTON':
            switch (form.elements[i].type) {
            case 'reset':
            case 'submit':
            case 'button':
                q[form.elements[i].name] = form.elements[i].value;
                break;
            }
            break;
        }
    }
    return q;
};
export function serializeForm(form) {
    if (!form || form.nodeName !== "FORM") {
        return;
    }
    var i, j, q = [];
    for (i = form.elements.length - 1; i >= 0; i = i - 1) {
        if (form.elements[i].name === "") {
            continue;
        }
        switch (form.elements[i].nodeName) {
        case 'INPUT':
            switch (form.elements[i].type) {
            case 'text':
            case 'email':
            case 'hidden':
            case 'password':
            case 'button':
            case 'reset':
            case 'number':
            case 'submit':
                q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                break;
            case 'checkbox':
            case 'radio':
                if (form.elements[i].checked) {
                    q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                }
                break;
            }
            break;
            case 'file':
            break;
        case 'TEXTAREA':
            q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
            break;
        case 'SELECT':
            switch (form.elements[i].type) {
            case 'select-one':
                q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                break;
            case 'select-multiple':
                for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                    if (form.elements[i].options[j].selected) {
                        q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].options[j].value));
                    }
                }
                break;
            }
            break;
        case 'BUTTON':
            switch (form.elements[i].type) {
            case 'reset':
            case 'submit':
            case 'button':
                q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                break;
            }
            break;
        }
    }
    return q.join("&");
};


function is_array(obj) {
    if (obj.constructor.toString().indexOf('Array') == -1) {
        return false;
    }
    return true;
}

export function stripTags(input) {
    if (input) {
        var tags = /<[^>]+>/ig
        if (!is_array(input)) {
            input = input.replace(tags,'');
        }else {
            var i = input.length;
            var newInput = new Array();
            while(i--) {
                input[i] = input[i].replace(tags,'');
            }
        }
        return input;
    }
    return false;
}
export function mapKeyColor(k, _default = 'empty') {
 switch (k) {
  case 'rent':
    return ({ backgroundColor: 'orange' });
  case 'are_renting':
    return ({ backgroundColor: '#512e90' });
  case 'sell':
    return ({ backgroundColor: '#66b807' });
  case 'placed':
    return ({ backgroundColor: '#0c7cd5' });
  case 'transfer':
    return ({ backgroundColor: '#d39e00' });
  default:
    return _default;
 }
}
export const transaction_status = {
  rent: 'CHO THUÊ',
  are_renting: 'ĐANG CHO THUÊ',
  transfer: 'CHUYỂN NHƯỢNG',
  origin_2: 'ĐÃ KHAI THÁC',
  sell: 'BÁN',
  placed: 'ĐẶT CHỖ',
}
export function mapKeyTransaction(data){
    let transaction = '';
    if (data) {
      const { type_key, sub_type_key } = data;
      if (sub_type_key !== 'sell_for' && sub_type_key !== 'transfer_for' && transaction_status[sub_type_key]) {
        transaction = transaction_status[sub_type_key];
      } else if (transaction_status[type_key]) {
        transaction = transaction_status[type_key];
      }
    }
    return transaction
}
export function mergeRootPath(route){
    let rootPath = window._rootPath || '/ttr'
    return (rootPath.lastIndexOf("/") == rootPath.length -1) ? rootPath + route : rootPath +'/'+ route
}
const isEqualSubset = (a, b) => {
  for (let key in a) if (a[key] !== b[key]) return false;
  return true;
};
export function isEqual(a, b) { return isEqualSubset(a, b) && isEqualSubset(b, a)}
export function checkSetting(setting,key,caption){
    for(let k in setting) if(setting[k].SettingKey && setting[k].SettingKey == key && setting[k].Caption == caption) return true
    return false
}
export function getSettingByKey(setting,key){
    let result = {}
    for(let k in setting) if(setting[k].SettingKey && setting[k].SettingKey == key) result = setting[k]
    return result
}
export function mapRole(role_id,group_id=0,_default='Member'){
    //TODO change to lang('lang_key') to support multi language
    if(group_id>0){
        switch (role_id){
          case 1:
            return 'Ban giám đốc'
          case 2:
            return 'Giám đốc sàn'
         //  case 4:
         //    return 'Trưởng phòng kinh doanh'
         // case 6:
         //    return 'Trưởng nhóm kinh doanh'
         case 3:
            return 'Nhân viên'
          default:
            return _default
         }

    }
    switch (role_id){
      case 2:
        return 'Owner'
      case 5:
        return 'Member'
      default:
        return _default
     }
}
export function loading(){
    document.getElementById("ajax-loading").style.display="block"
}

export function loaded(){
    document.getElementById("ajax-loading").style.display="none"
}

export function setHeight(id,height){
    document.getElementById(id).style.height=height
}
export function setWidth(id,width){
    document.getElementById(id).style.width=width
}
export function setValueForInputId(id,value){
    if (document.getElementById(id)) document.getElementById(id).value=value
}
export function checkUserInGroup(group, user, group_id){
    if(group.length==0 || group_id==0) return true;//wait for async or not select group
    var in_group = false;
    group.map((v) => {
        if(v.group_id === group_id && v.user_id == user.Account_Id){
            in_group=true;
        }
    })
    return in_group;
}
const list_resource ={
    1:'Tổng giám đốc',
    2:'Giám đốc sàn',
    3:'Nhân viên'
}
export function checkRoleOnResouce(RoleOnResouce){
    return RoleOnResouce && RoleOnResouce.role_in_team_id ? list_resource[RoleOnResouce.role_in_team_id] : 'Nhân viên'
}
export function checkTeamInGroup(RoleOnResouce){
    return RoleOnResouce && RoleOnResouce.role_in_team_name!="" ? RoleOnResouce.role_in_team_name : 'Nhân viên'
}
export function initUserGroup(){
    var group = {}
    for(i in list_resource){
        group[list_resource[i]] = []
    }
    return group
}
export function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
export function checkRenderType (k, data) {
  switch (k) {
    case 'project':
      if (data && data.apartment_id !== null) return true
      break
    case 'project_nmk':
      if (data && data.apartment_id == null && data.project_id > 0) return true
      break
    case 'property':
      if (data && data.apartment_id == null && (data.project_id == null || data.project_id === 0)) return true
      break
    default:
      break
  }
  return false
}
export function isObject(o){
    return o !== null && typeof o === 'object'
}

export function validateYouTubeUrl(url) {
    if (url != undefined || url != '') {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        var match = url.match(regExp)
        if(match && match[2].length == 11) {
          return true
        }else{
          return false
        }
    }
  }
export function mergeCustomer(customer_select = {}, customer_default = {}, _key){
    var customer = {}
    if(customer_default[_key+"_name"] || customer_default[_key+"_phone"]){
        customer.value = customer_default[_key+"_name"]
        customer.phone = customer_default[_key+"_phone"]
        customer.label = customer_default[_key+"_name"]
    }
    if(customer_select.value!="" || customer_select.phone!=""){
        customer.value = customer_select.value
        customer.phone = customer_select.phone
        customer.label = customer_select.label
    }
    return customer
}

export function storeLoad(key, callback){
    return global.storage.load({
        key: key,
        autoSync: true,
        syncInBackground: true
    }).then(ret => {
        if(callback){
            callback(ret)
        }
        return ret;
    }).catch(err => {
        //console.warn(err.message);
        console.log(err.message)
        switch (err.name) {
            case 'NotFoundError':
                console.log('storeLoad: ',err.name,key)
                // TODO;
                break;
            case 'ExpiredError':
                console.log('storeLoad: ',err.name,key)
                // TODO
                break;
            default:
                console.log('storeLoad: ',err.name,key)
        }
        if(callback){
            callback(null)
        }
        return null
    })
}

export function storeSave(key, rawData, ttl=null){
    global.storage.save({
        key: key,
        rawData: rawData,
        expires: (ttl !=null ? ttl : 1000 * 3600 * 24 * 30)
    });
}
export function storeRemove(key) {
    global.storage.remove({
        key: key
    });
}
