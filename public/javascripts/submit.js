
$(function()
{   
    $('#reused_form').submit(function(e)
    {
        e.preventDefault();
        
        $form = $(this);
        
        $.ajax({
            type: "POST",
            url: 'http://localhost:3000/submit',
            data: $form.serialize(),
            success: function (response) {
                window.location = "http://localhost:3000/view";
            },
            dataType: 'json' 
        });    
        
        
    });	
});
