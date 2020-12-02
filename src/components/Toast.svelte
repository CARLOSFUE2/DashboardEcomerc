<script>
	import { Toast, ToastBody, ToastHeader } from 'sveltestrap';
	import { toast } from '../store.js'

	let isOpen;
	let color;
	let title;
	let message;

	let subscribe = toast.subscribe(value => {
		console.log(value);
		isOpen = value.isOpen;
		color = value.color;
		title = value.title;
		message = value.message;
	})

	const handleToast = () => {
		$toast = {
			isOpen: false,
		}
	}


	$: if (isOpen) {
		setTimeout(() => {
			handleToast()
		}, 3000)
	}

</script>
<style>
	.toastPosition {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 20rem;
		padding: .5rem;
	}
</style>
<div class="toastPosition">
<Toast {isOpen} class="mr-1 text-{color}">
  <ToastHeader>{title}</ToastHeader>
  <ToastBody>
  	{message}
  </ToastBody>
</Toast>
</div>
