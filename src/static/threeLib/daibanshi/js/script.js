var input = document.querySelector('#text'),

    btn = document.querySelector('button'),

    ul = document.querySelector('.list ul'),

    li = document.querySelector('.list ul li');



btn.addEventListener('click', () => {

    const val = input.value;

    if(val == '' || val == ' ') {

        alert('请先写点东西');

    } else {

        let liItems = document.createElement('li');

        let spanOne = document.createElement('span');
        let spanTwo = document.createElement('span');

        let soText = document.createTextNode('完成!');
        let stText = document.createTextNode('删除');

        spanOne.appendChild(soText);
        spanTwo.appendChild(stText);

        spanOne.setAttribute('class', 'first');
        spanTwo.setAttribute('class', 'second');

        liItems.textContent = val;

        liItems.appendChild(spanOne);
        liItems.appendChild(spanTwo);

        ul.appendChild(liItems);

      
      
      spanOne.addEventListener('click', () => {

           liItems.style.background = 'rgb(24, 189, 24)'; 
           liItems.style.color = 'white'; 
        });

        spanTwo.addEventListener('click', () => {

            liItems.style.display = 'none'; 
         });

      

    }

    /* to make the input empty after you click the button */
    document.querySelector('#text').value = '';


});