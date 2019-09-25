const config = require(path.join(__dirname,'..','config'));

$(function()
{   
    $('#reused_form').submit(function(e)
    {
        e.preventDefault();
        
        $form = $(this);
        
        $.ajax({
            type: "POST",
            url: config.ip_address+'/delete',
            data: $form.serialize(),
            success: function (response) {
                window.location = config.ip_address+"/view";
            },
            dataType: 'json' 
        });    
        
        
    });	
});
