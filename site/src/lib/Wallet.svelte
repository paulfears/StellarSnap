<script>
    import {address} from '../store'
    import {Card} from 'flowbite-svelte'
</script>

<div class="w-fit flex-col justify-start p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <h2>Metamask Account</h2>
    {$address}
</div>
<br/>