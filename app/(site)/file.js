function printArrayElements(arr, index = 0) {
    if (index >= arr.length) {
      return; 
    }
    
    console.log(arr[index]); 
    
    printArrayElements(arr, index + 1); 
  }
  
  const numbers = [1, 2, 3, 4, 5];
  
  printArrayElements(numbers);