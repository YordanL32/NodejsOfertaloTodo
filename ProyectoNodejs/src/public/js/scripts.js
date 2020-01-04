$('#post-comment').hide();
$('#btn-toggle-comment').click(e => {
    e.preventDefault();
    $('#post-comment').slideToggle();
  });
$('#btn-likes').click(function(e){
    e.preventDefault();
    let publicId = $(this).data('id')
    $.post('/publicaciones/'+ publicId +'/like')
    .done(data =>{
        console.log(data);
        $('.likes-count').text(data.likes);
    })
});

 // Delete Button Request
 $('#btn-delete').click(function (e) {
    e.preventDefault();
    let $this = $(this);
    const response = confirm('Estas seguro que deseas eliminar la publicacion?');
    if (response) {
      let imgId = $(this).data('id');
      $.ajax({
        url: '/publicaciones/' + imgId,
        type: 'DELETE'
      })
        .done(function(result) {
           
           $this.removeClass('btn-danger').addClass('btn-success');
          $this.find('i').removeClass('fa-times').addClass('fa-check');
          $this.append('<span>Eliminado!</span>'); 
        });
    }
  });

