<script>
    export let type, id, placeholder, value;

    function setType(node) {
        node.type = type;
    }
</script>

<!--This is not seen until the JS updates the height-->
<div id = {id + "_error"} class = "h-0 text-red-500 text-sm font-semibold"></div>
<input class="rounded-md focus:ring-2 focus:ring-blue-500 text-center w-full focus:outline-none text-sm leading-6 py-2 mb-4 ring-1 ring-gray-200"
    use:setType {id} {placeholder} bind:value>
<br>