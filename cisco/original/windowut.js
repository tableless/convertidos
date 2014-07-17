Function isOpenerClosed
	Dim test
	on error resume next
	test = window.opener.location.href
	isOpenerClosed = false
	If Err.Number <> 0 Then
		isOpenerClosed = true
	End If
End Function
