package com.bapop.dce.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class PosfmbID implements java.io.Serializable {
	private int anomes;
	private int grp;

	public PosfmbID() {
	}

	public PosfmbID(int anomes, int grp) {
		this.anomes = anomes;
		this.grp = grp;
	}

	@Column(name = "anomes", nullable = false)
	public int getAnomes() {
		return this.anomes;
	}

	public void setAnomes(int anomes) {
		this.anomes = anomes;
	}

	@Column(name = "grp")
	public int getGrp() {
		return this.grp;
	}

	public void setGrp(int grp) {
		this.grp = grp;
	}

	public boolean equals(Object other) {
		if ((this == other))
			return true;
		if ((other == null))
			return false;
		if (!(other instanceof PosfmbID))
			return false;
		PosfmbID castOther = (PosfmbID) other;

		return (this.getAnomes() == castOther.getAnomes())
				&& (this.getGrp() == castOther.getGrp());
	}

	public int hashCode() {
		int result = 17;

		result = 37 * result + this.getAnomes();
		result = 37 * result + this.getGrp();
		return result;
	}
}
