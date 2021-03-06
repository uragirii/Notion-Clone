const text = document.getElementById('menubar')
let showTip = false
let currIndex = 1;

const quill = new Quill('#quillEditor', {
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['image', 'code-block']
      ]
    },
    placeholder: 'Type / for commands...',
    theme: 'snow'  // or 'bubble'
  });


/**
 * Main task is to show a small menubar and then depending on the selection format the quill settings
 */
quill.on('text-change', function(delta, oldDelta, source) {
  if (source == 'user') {
		const {ops} = delta
		// Two cases can be there, if only starting, then ops would contain only one array
		if(ops[0] && ops[0].insert && ops[0].insert === '/'){
			const bounds = quill.getBounds(0)
			
			text.style.top = `${bounds.top+105}px`
			text.style.left = `${bounds.left+20}px`
			// Show the menu bar
			// Ask the user what he wants
			text.style.display = "flex"
		}
		else if(ops[1] && ops[1].insert && ops[1].insert === '/'){
			const bounds = quill.getBounds(ops[0].retain)
			text.style.top = `${bounds.top+105}px`
			text.style.left = `${bounds.left+30}px`
			text.style.display = "flex"
			currIndex+=ops[0].retain
		}
		else{
			text.style.top = 0
			text.style.left = 0
			text.style.display = "none"
		}
	}
});

document.getElementById("blockquote").addEventListener('click', (e)=>{
	quill.formatLine(currIndex,1,'blockquote', true)
})

document.getElementById("header").addEventListener('click', (e)=>{
	quill.formatLine(currIndex,1,'header', true)
})

document.getElementById("list").addEventListener('click', (e)=>{
	quill.formatLine(currIndex,1,'list', true)
})

document.getElementById("code").addEventListener('click', (e)=>{
	quill.formatLine(currIndex,1,'code-block', true)
})