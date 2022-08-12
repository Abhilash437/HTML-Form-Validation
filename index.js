const form = document.getElementById('form');
const source = document.getElementById('source');
const pipeline = document.getElementById('pipeline');
const projectName = document.getElementById('projectName');
const bucketName = document.getElementById('bucketName');
const files = document.getElementById('files');
const credentials= document.getElementById('credentials');
const time = document.getElementById('time');

form.addEventListener('submit', e => {

    e.preventDefault();
    validateInputs();
    console.log(e);

});



const setError = (element, message) => {
    const inputControl = element.parentElement;
    console.log(element.parentElement);
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setErrorAll = (element, message) => {
  Object.entries(element).forEach(entry => {
    const [key,value] = entry;
    const inputControl = value[1].parentElement;
    console.log(element.parentElement);
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
  })
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    //console.log(errorDisplay);
    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

function containsSpecialChars(str) {
  const specialChars = /[`!@#$%^&*()\=\[\]{};'"\\,<>\/?~]/;
  return specialChars.test(str);
}


const validateInputs = () => {
  const sourceValue = source.value.trim();
  const pipelineValue = pipeline.value.trim();
  const projectNameValue = projectName.value.trim();
  const bucketNameValue = bucketName.value.trim();
  const filesValue = files.value.trim();
  const credentialsValue = credentials.value.trim();
  const timeValue = time.value.trim();

  const values  = {
    svalue:[
      sourceValue,
      source
    ],
    pipeV: [
      pipelineValue,
      pipeline
    ],
    projV: [
      projectNameValue,
      projectName
    ],
    buckV: [
      bucketNameValue,
      bucketName
    ],
    fileV: [
      filesValue,
      files
    ],
    credV: [
      credentialsValue,
      credentials
    ],
    timeV: [
      timeValue,
      time
    ]
  };
  //console.log(sourceValue);
  Object.entries(values).forEach(entry => {
    const [key,value] = entry;

    if(value[0].length<5){
      setError(value[1],"Can not be less than 5 characters");
    }else if(containsSpecialChars(value[0])){
      setError(value[1],"Can not contain special characters");
    }else if(value[0].startsWith("+") || value[0].startsWith("-")|| value[0].startsWith("_")){
      setError(value[1],"Can not begin with +, -, _ ");
    }else if(value[1].id.trim()==="time" && isNaN(value[0])){
      setError(value[1],"It should be a number")
    }else{
      setSuccess(value[1]);
    }
  });

}
