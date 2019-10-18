$(document).ready(function(){
	//AJAX request to the randomuser API
	$.getJSON(
		'https://randomuser.me/api/',
		{
			results: 12,
			nat:['us'],
		}, 
		function displayInfo(data){
			let updateHTML = '<h1>AWESOME STARTUP EMPLOYEE LINEUP</h1>';
			for(let i = 0; i < 12; i++){
				//Adding Employing data to HTML		
				let employee = data.results[i];
				let location = employee.location;
				let dob = employee.dob.date.substring(0, 10);
				updateHTML += '<div class="card">';
				updateHTML += '<a class="modal" href="'+ employee.picture.large +'">' ;
				updateHTML += '<div class="profile-pic">';
				updateHTML += '<img class="picture" src="' + employee.picture.large +'"></div>';
				updateHTML += '<div class="profile-info">';
				updateHTML += '<h4 class="name">' + employee.name.first + ' ' + employee.name.last + '</h4>';
				updateHTML += '<p class="email">' + employee.email +'</p>';
				updateHTML += '<p class="city">' + location.city + '</p>';
				updateHTML += '<p class="phone">' + employee.phone + '</p>';
				updateHTML += '<p class="street">' 
							+ location.street.number + ' ' + location.street.name + ', '
							+ location.state + ', '  
							+ location.postcode + '</p>';
				updateHTML += '<p class="birthday">' + 'Birthday: ' + dob + '</p>';
				updateHTML +='</div></a></div>';

			}
			//Enables the jQuery Framework of 'Lightbox' to display in modal form 
			$('div.board').html(updateHTML);
			$('a.modal').each(function(i){
				$(this).attr('data-lightbox', 'img-' + i);
				$(this).attr('data-title', 'Click to the left or right of the modal to exit');
				$(this).css('color','#000');
			})
			$('p.phone').css('display', 'none');
			$('p.street').css('display', 'none');
			$('p.birthday').css('display','none');
			let $anchor = $('a.modal');
			//displays the modal with the correct info
		$anchor.on('click', function(){
			//travering through the DOM in order to display modal
			let overlay = this.parentNode.parentNode.parentNode.nextElementSibling.nextElementSibling
				.nextElementSibling.nextElementSibling.nextElementSibling;
			let profileInfo = this.childNodes[1];
			let nav = overlay.firstChild.firstChild.childNodes[1].childNodes;
			console.log(nav);
			//Changing the HTML on each elements.
			for (let i=2; i < 8; i++){
				nav[i].innerHTML = profileInfo.childNodes[i-2].innerHTML;
			}
		})
	});
	//Using the lightbox options to enable features 
	lightbox.option({
		'alwaysShowNavOnTouchDevices': true,
		'wrapAround': true,
		'sanitizeTitle': true
	});

});