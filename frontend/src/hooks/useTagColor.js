const TAG_COLORS = [
  '#f9fafb', // gray-50
  '#f3f4f6', // gray-100
  '#e5e7eb', // gray-200
  '#fef2f2', // red-50
  '#fee2e2', // red-100
  '#fecaca', // red-200
  '#fff1f2', // rose-50
  '#ffe4e6', // rose-100
  '#fde2e2', // soft red
  '#f8fafc', // soft gray
  '#f1f5f9', // slate-100
  '#fdf2f8', // pink-50 느낌
  '#fafafa', // neutral
  '#f5f5f5'  // gray-100 느낌
]

function hashString(s){
    let h =0

    for(let i=0; i<s.length;i++){
        h= (h*33)^ s.charCodeAt(i)
    }


    return Math.abs(h)

}


export function getTagColor(label){

    if(label==null || label=='') return '#e5e7eb'
    if(label==='전체') return '#e5e7eb'
    const idx = hashString(String(label))%TAG_COLORS.length

    return TAG_COLORS[idx]
}
export function getRandomColor(label){
    return getTagColor(label ?? '')
}