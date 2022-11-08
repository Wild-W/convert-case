use neon::prelude::*;
use std::mem::transmute;
use convert_case::{Casing, Pattern, Case, Converter, Boundary};

fn js_case_convert(mut cx: FunctionContext) -> JsResult<JsString>
{
    let str: String = cx.argument::<JsString>(0)?.value(&mut cx);
    let case_type: Case = unsafe { transmute(cx.argument::<JsNumber>(1)?.value(&mut cx) as u8) };
    let mut conv = Converter::new();

    // Alternative way of declaring an optional argument
    let js_from_case: Handle<JsValue> = cx.argument(2)?;
    if js_from_case.is_a::<JsNumber, _>(&mut cx)
    {
        let from_case: Case = unsafe { transmute(js_from_case.downcast_or_throw::<JsNumber, _>(&mut cx)?.value(&mut cx) as u8) };
        conv = conv.from_case(from_case);
    }

    Ok(cx.string(conv.to_case(case_type).convert(str)))
}

fn js_is_case(mut cx: FunctionContext) -> JsResult<JsBoolean>
{
    let str: String = cx.argument::<JsString>(0)?.value(&mut cx);
    let case_type = cx.argument::<JsNumber>(1)?.value(&mut cx) as u8;

    unsafe
    {
        Ok(cx.boolean(str.is_case(transmute(case_type))))
    }
}

fn js_mutate_str(mut cx: FunctionContext) -> JsResult<JsString>
{
    let str: String = cx.argument::<JsString>(0)?.value(&mut cx);
    let options = cx.argument::<JsObject>(1)?;
    let mut conv = Converter::new();

    let js_delim: Handle<JsValue> = options.get(&mut cx, "delim")?;
    if js_delim.is_a::<JsString, _>(&mut cx)
    {
        let delim: String = js_delim.downcast_or_throw::<JsString, _>(&mut cx)?.value(&mut cx);
        conv = conv.set_delim(delim);
    }

    let js_pattern: Handle<JsValue> = options.get(&mut cx, "pattern")?;
    if js_pattern.is_a::<JsNumber, _>(&mut cx)
    {
        let pattern: Pattern = unsafe { transmute(js_pattern.downcast_or_throw::<JsNumber, _>(&mut cx)?.value(&mut cx) as u8) };
        conv = conv.set_pattern(pattern);
    }

    let js_boundaries: Handle<JsValue> = options.get(&mut cx, "boundaries")?;
    if js_boundaries.is_a::<JsArray, _>(&mut cx)
    {
        conv = conv.remove_boundaries(&Boundary::all());
        let boundaries: Vec<Handle<JsValue>> = js_boundaries.downcast_or_throw::<JsArray, _>(&mut cx)?.to_vec(&mut cx)?;
        for boundary in boundaries
        {
            conv = conv.add_boundary(unsafe { transmute(boundary.downcast::<JsNumber, _>(&mut cx).unwrap().value(&mut cx) as u8) });
        }
    }

    Ok(cx.string(conv.convert(str)))
}

fn boundary_vec_to_array<'a, C: Context<'a>>(vec: Vec<Boundary>, cx: &mut C) -> JsResult<'a, JsArray>
{
    let a = JsArray::new(cx, vec.len() as u32);

    for (i, s) in vec.iter().enumerate()
    {
        let v = cx.number(*s as u8);
        a.set(cx, i as u32, v)?;
    }

    Ok(a)
}

fn js_list_from(mut cx: FunctionContext) -> JsResult<JsArray>
{
    let from_str: String = cx.argument::<JsString>(0)?.value(&mut cx);
    
    Ok(boundary_vec_to_array(Boundary::list_from(from_str.as_str()), &mut cx).unwrap())
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()>
{
    cx.export_function("toCase", js_case_convert)?;
    cx.export_function("isCase", js_is_case)?;
    cx.export_function("mutate", js_mutate_str)?;
    cx.export_function("listFrom", js_list_from)?;
    Ok(())
}
