/**
 * Adds property to an especific index.
 * @param {Object} obj Object to documentate
 * @param {String} className the name of the initial Class
 * @param {boolean} swaggerOption adds swagger for nestjs
 * @param {boolean} validationOption odds validation by class-validator
 */
function documentation(obj, className = "NewClass", swaggerOption= false, validationOption =false) {
  if (!(obj instanceof Object))
    throw "First and Second params must be Object types";
  try {
    let newObj = {};
    let arr = Object.keys(obj);
    logService(obj,className,swaggerOption,validationOption)
    arr.forEach(x => {
      if (obj[x] instanceof Array) {
      } else if (obj[x] instanceof Object) {
        documentation(obj[x], x,swaggerOption,validationOption);
      }
    });
    return newObj;
  } catch (e) {
    console.error(e);
    console.error("Error ocurred, returning original Object");
    return obj;
  }
}

function swaggerService(type,example='',isArray=''){
  if(example){
    if(type == 'string'){
      example = `example:'${example}', `
    } 
    else example= `example:${example}, `
  }
  if(isArray)
    isArray = `,isArray:true`
  if(type)
    type = type == 'string'? 'String' : type
  console.log(`@ApiModelProperty({`+example+ `type: ${type}`+isArray+ `})`)
}

function validationService(type){
  switch (type) {
    case 'string':
      
      break;
  
    default:
      break;
  }
}

function logService(obj, className,swaggerOption,validationOption) {
  let arr = Object.keys(obj);
  className = className.toString()[0].toUpperCase()+className.toString().slice(1)
  console.log(`export class ${className} {`);
  arr.forEach(x => {
    if (obj[x] instanceof Array) {
        let arrayType = typeof obj[x][0]=="undefined"?'any':typeof obj[x][0]
        arrayType = `Array<${arrayType}>`
        //if(validationOption) validationService()
        let example = JSON.stringify(obj[x])||''
        if(swaggerOption) swaggerService('Array',example.replace(`'`,``),true)
        console.log(`${x}:${arrayType}`);
    } else if (obj[x] instanceof Object) {
        let name = x.toString()[0].toUpperCase()+x.toString().slice(1)
        if(swaggerOption) swaggerService(`${name||'Object'}`)
        console.log(`${x}:${name||'Object'}`);

    } else {
        if(validationOption) validationService()
        if(swaggerOption) swaggerService(typeof obj[x],obj[x])
      console.log(`${x}:${typeof obj[x]}`);
    }
  });
  console.log(`}`);
}

module.exports = documentation;
