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
const isEqualSubset = (a, b) => {
  for (let key in a) if (a[key] !== b[key]) return false;
  return true;
};
export function isEqual(a, b) { return isEqualSubset(a, b) && isEqualSubset(b, a)}

export function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
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
export const iconStyle = {
    style1: {
        color: 'rgb(184, 166, 228)',
        size: 30
    },
    style2: {
        color: 'rgb(126, 239, 204)',
        size: 30
    },
    style3: {
        color: 'rgb(255, 255, 255)',
        size: 30
    },
    style4: {
        color: 'rgb(0, 0, 0)',
        size: 30
    },
  
}