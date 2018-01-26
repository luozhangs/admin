package com.admin.vm.znode;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class ZNodes implements Serializable {
	private static final long serialVersionUID = 1L;
	private String id;
	private String pId;
	private String name;
	private String checked;
	private String open;
	private String chkDisabled;	
	private String other;
	private String isParent;
	private List<ZNodes> children = new ArrayList<>();

	public String getIsParent() {
		return isParent;
	}

	public void setIsParent(String isParent) {
		this.isParent = isParent;
	}

	public List<ZNodes> getChildren() {
		return children;
	}

	public void setChildren(List<ZNodes> children) {
		this.children = children;
	}

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getpId() {
		return pId;
	}
	public void setpId(String pId) {
		this.pId = pId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getChecked() {
		return checked;
	}
	public void setChecked(String checked) {
		this.checked = checked;
	}
	public String getOpen() {
		return open;
	}
	public void setOpen(String open) {
		this.open = open;
	}
	public String getChkDisabled() {
		return chkDisabled;
	}
	public void setChkDisabled(String chkDisabled) {
		this.chkDisabled = chkDisabled;
	}
	public String getOther() {
		return other;
	}
	public void setOther(String other) {
		this.other = other;
	}
	@Override
	public Object clone() throws CloneNotSupportedException {
		return super.clone();
	}
	
	
}
