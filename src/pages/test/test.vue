<template>
<div>
    <bgvideo :sources="['http://movie.ks.js.cn/flv/other/1_0.mp4']">
        <!-- If you want to add content here, a slot is waiting! -->
    </bgvideo>

  

</div>


<!-- <iframe src="//player.bilibili.com/player.html?aid=26704963&cid=46208308&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe> -->
</template>
<script>
export default {
    data() {
        return {
            mypost:{
                select:'goog'
            },
            options: [{
                    label: 'Google',
                    value: 'goog'
                },
                {
                    label: 'Facebook',
                    value: 'fb'
                },
                {
                    label: 'Twitter',
                    value: 'twtr'
                },
                {
                    label: 'Apple Inc.',
                    value: 'appl'
                },
                {
                    label: 'Oracle',
                    value: 'ora'
                }
            ],
        }
    }
}
</script>

