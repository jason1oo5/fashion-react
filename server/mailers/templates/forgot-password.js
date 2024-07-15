const getResetTemplate = (link) => {
    const resetTemplate = `
    <div style="display: flex; justify-content: center; background-color: darkgray; padding: 30px;">
		<div style="max-width: 800px; min-width: 500px; background-color: white; padding: 30px; font-family: Helvetica,Arial,sans-serif">
			<h1 style="text-align: center; color: rgb(61, 94, 91);">Reset your passowrd</h1>
			<p style="padding-inline: 50px; color:rgb(0, 0, 0); font-size: large; line-height: 30px;">
				Hi. <br>
				Please click under button to reset your password<br>
                This will be expired in 15min.<br>
				You will be redirect to reset password link<br>				
				@support_team
			</p>
			<div style="text-align:center; justify-content: center; display: flex;">  
				<a style="background-color:#14a800;border:2px solid #14a800;border-radius:100px;min-width:230px; max-width: 300px; color:#ffffff;white-space:nowrap;font-weight:normal;display:block;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:40px;text-align:center;text-decoration:none" href=${link} target="_blank" data-saferedirecturl="https://www.google.com/url?q=${link}">Reset Password</a>
			</div>							
		</div>
	</div>
    `
    return resetTemplate;
}

module.exports = getResetTemplate;