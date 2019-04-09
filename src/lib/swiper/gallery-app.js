function swiperInit(){
	new Swiper('.swiper-container', {
			speed:450,
			pagination: {
			    el: '.pagination',
			    bulletElement : 'li',
			    currentClass : 'my-pagination-current'
			},	
			autoplay: {
				delay: 2300,
				disableOnInteraction: false
			},
			loop:true,
			preventLinksPropagation: false
	    });
}
